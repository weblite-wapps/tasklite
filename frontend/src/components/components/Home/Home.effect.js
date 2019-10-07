// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
// actions
import {
  dispatchLoadTagsDataInAdd,
  dispatchChangeAssigneeInAdd,
} from '../Add/Add.action'
import { dispatchLoadTagsDataInFilter } from '../Filter/Filter.action'
import { LOAD_MORE, dispatchChangePopoverId } from '../List/main/List.action'
import {
  FETCH_INITIAL_DATA,
  DELETE_TASK,
  HANDLE_DELETE_TASK,
  HANDLE_DRAG_TASK,
  LOAD_USERS,
  SET_ALL_TASKS,
  DRAG_TASK,
  dispatchLoadTasksData,
  dispatchSetIsLoading,
  dispatchLoadNumberOfTasks,
  dispatchSetAllTasks,
  dispatchSetWappMode,
  dispatchChangeLevel,
  dispatchHandleChangeLevel,
  dispatchSetOrder,
} from './Home.action'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// views
import {
  wisView,
  userView,
  userIdView,
  userNameView,
  tabIndexView,
  tasksView,
} from './Home.reducer'
// helpers
import { pulse } from '../../../helper/functions/realtime.helper'
import { updateTasksInFront, mapToUsername, getLevel } from './Home.helper'
import {
  getRequest,
  postRequest,
} from '../../../helper/functions/request.helper'

const usersEpic = action$ =>
  action$
    .ofType(FETCH_INITIAL_DATA)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() =>
      postRequest('/saveUser')
        .send({
          wis: wisView(),
          userId: userIdView(),
          username: userNameView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchChangeAssigneeInAdd(userView()))
    .mergeMap(() =>
      getRequest('/fetchUsers')
        .query({
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(
      ({ body }) =>
        window.W &&
        window.W.getUsersInfo(mapToUsername(body)).then(info => {
          const users = R.values(info)
          pulse(LOAD_USERS, users)
        }),
    )
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const initialFetchEpic = action$ =>
  action$
    .ofType(FETCH_INITIAL_DATA)
    .do(
      () =>
        window.W &&
        window.W.setHooks({
          wappWillStart(start, err, { mode }) {
            dispatchSetWappMode(mode)
            start()
          },
        }),
    )
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() =>
      getRequest('/initialFetch')
        .query({ wis: wisView() })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(({ body: { tasks } }) => dispatchLoadTasksData(tasks))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInFilter(tags))
    .do(({ body: { numberOfTasks } }) =>
      dispatchLoadNumberOfTasks(numberOfTasks),
    )
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const deleteTaskEpic = action$ =>
  action$
    .ofType(HANDLE_DELETE_TASK)
    .pluck('payload')
    .do(({ task }) => pulse(DELETE_TASK, task))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ task: { _id } }) =>
      postRequest('/deleteTask')
        .query({
          _id,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchChangeSnackbarStage('Deleted successfully !'))
    .do(() => dispatchChangePopoverId(''))
    .do(() => window.W && window.W.analytics('DELETE_TASK'))
    .ignoreElements()

const loadMoreEpic = action$ =>
  action$
    .ofType(LOAD_MORE)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ skipLength, tabIndex }) =>
      getRequest('/loadMore')
        .query({
          query: {
            wis: wisView(),
            level: tabIndex,
          },
          skipLength,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchLoadTasksData(body))
    .do(() => window.W && window.W.analytics('LOAD_MORE_CLICK'))
    .ignoreElements()

//TODO: THIS EPIC AND IT'S HELPER FUNCTION SHOULD BE REFACTORED
const dragTaskEpic = action$ =>
  action$
    .ofType(HANDLE_DRAG_TASK)
    .pluck('payload')
    .do(console.log)
    .filter(
      ({ destination }) =>
        (destination && destination.index > -1) ||
        (() => {
          dispatchChangeSnackbarStage('Destination must be in task list zone')
          return false
        })(),
    )
    .do(() => dispatchSetIsLoading(true))
    .map(payload => ({
      ...payload,
      destTasks: R.filter(
        task =>
          R.prop('level', task) === R.prop('droppableId', payload.destination),
        tasksView(),
      ),
      sourceTasks: R.filter(
        task => R.prop('level', task) === R.prop('droppableId', payload.source),
        tasksView(),
      ),
    }))
    .do(console.log)

    .map(({ source, destination, destTasks, sourceTasks }) => ({
      source,
      destination,
      sourceId: R.prop('_id', R.nth(R.prop('index', source), sourceTasks)),
      title: R.prop('title', R.nth(R.prop('index', source), sourceTasks)),
      destinationId: R.prop(
        '_id',
        R.nth(R.prop('index', destination), destTasks),
      ),
      allTasks: tasksView(),
    }))
    .do(console.log)

    // .do(({ source, destination }) =>
    //   pulse(SET_ALL_TASKS, updateTasksInFront(source, destination)),
    // )

    .map(({ sourceId, destinationId, destination, allTasks, ...rest }) => ({
      sourceId,
      desOrder: R.prop(
        'order',
        R.find(R.propEq('_id', destinationId), allTasks),
      ),
      sourceIndex: R.findIndex(R.propEq('_id', sourceId), allTasks),
      destinationIndex: R.findIndex(R.propEq('_id', destinationId), allTasks),
      allTasks,
      destination,
      ...rest,
    }))
    .do(console.log)

    .map(
      ({
        sourceId,
        sourceIndex,
        destinationIndex,
        allTasks,
        desOrder,
        ...rest
      }) => ({
        desOrder,
        desSiblingOrder:
          destinationIndex + 1 === R.length(allTasks)
            ? desOrder - 100
            : !destinationIndex
            ? desOrder + 100
            : R.prop(
                'order',
                R.nth(
                  destinationIndex > sourceIndex
                    ? destinationIndex + 1
                    : destinationIndex - 1,
                  allTasks,
                ),
              ),
        allTasks,
        sourceId,
        prevLevel: getLevel(sourceId),
        ...rest,
      }),
    )
    .do(({ source, destination, desOrder, desSiblingOrder }) => {
      dispatchSetAllTasks(
        updateTasksInFront(source, destination, desOrder, desSiblingOrder),
      )
    })
    .do(console.log)
    .do(({ sourceId, destination, title, prevLevel }) =>
      dispatchHandleChangeLevel(
        sourceId,
        prevLevel,
        R.prop('droppableId', destination),
        title,
      ),
    )
    .mergeMap(({ sourceId, desOrder, desSiblingOrder, allTasks }) =>
      postRequest('/dragTask')
        .send({
          sourceId,
          desOrder,
          desSiblingOrder,
        })
        .on('error', err => {
          dispatchSetAllTasks(allTasks)
          err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!')
        })
        .then(({ body: { _id, order } }) => ({ _id, order })),
    )
    .do(() => dispatchSetIsLoading(false))
    // .do(({ _id, order }) => pulse(DRAG_TASK, { _id, order })) // For production test
    // .do(({ _id, order }) => dispatchSetOrder({ _id, order })) // For development test
    .do(
      () =>
        window.W &&
        window.W.analytics('DRAG_AND_DROP_TASK', { stage: tabIndexView() }),
    )
    .ignoreElements()

export default combineEpics(
  usersEpic,
  initialFetchEpic,
  deleteTaskEpic,
  loadMoreEpic,
  dragTaskEpic,
)
