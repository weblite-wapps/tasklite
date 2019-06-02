// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
// helpers
import { getQuery, mapToUsername, updateTasksInFront } from './Home.helper'
import {
  getRequest,
  postRequest,
} from '../../../helper/functions/request.helper'
// actions
import {
  dispatchLoadTagsDataInAdd,
  dispatchLoadUsersDataInAdd,
  dispatchChangeAssigneeInAdd,
} from '../Add/Add.action'
import { dispatchLoadTagsDataInFilter } from '../Filter/Filter.action'
import { LOAD_MORE, dispatchChangePopoverId } from '../List/main/List.action'
import {
  FETCH_INITIAL_DATA,
  DELETE_TASK,
  dispatchLoadUsersData,
  dispatchLoadTasksData,
  dispatchSetIsLoading,
  dispatchLoadNumberOfTasks,
  dispatchUpdateNumbersObject,
  HANDLE_DRAG_TASK,
  dispatchSetAllTasks,
  dispatchSetIndexInDb,
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
          dispatchLoadUsersDataInAdd(users)
          dispatchLoadUsersData(users)
        }),
    )
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const initialFetchEpic = action$ =>
  action$
    .ofType(FETCH_INITIAL_DATA)
    .do(() => window.W && window.W.start())
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() =>
      getRequest('/initialFetch')
        .query(getQuery())
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
    .ofType(DELETE_TASK)
    .pluck('payload')
    .do(({ task }) => dispatchUpdateNumbersObject(task.level, 'kind'))
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
            ...getQuery(),
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

const dragTaskEpic = action$ =>
  action$
    .ofType(HANDLE_DRAG_TASK)
    .pluck('payload')
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
      pageTasks: R.filter(
        task => R.prop('level', task) === tabIndexView(),
        tasksView(),
      ),
    }))
    .map(({ source, destination, pageTasks }) => ({
      source,
      destination,
      sourceId: R.prop('_id', R.nth(R.prop('index', source), pageTasks)),
      destinationId: R.prop(
        '_id',
        R.nth(R.prop('index', destination), pageTasks),
      ),
      allTasks: tasksView(),
    }))

    .do(({ source, destination }) => {
      dispatchSetAllTasks(updateTasksInFront(source, destination))
    })
    .map(({ sourceId, destinationId, allTasks }) => ({
      sourceId,
      desIndexInDb: R.prop(
        'indexInDb',
        R.find(R.propEq('_id', destinationId), allTasks),
      ),
      sourceIndex: R.findIndex(R.propEq('_id', sourceId), allTasks),
      destinationIndex: R.findIndex(R.propEq('_id', destinationId), allTasks),
      allTasks,
    }))

    .map(
      ({ sourceIndex, destinationIndex, allTasks, desIndexInDb, ...rest }) => ({
        desIndexInDb,
        desSiblingIndexInDb:
          destinationIndex + 1 === R.length(allTasks)
            ? desIndexInDb - 100
            : !destinationIndex
            ? desIndexInDb + 100
            : R.prop(
                'indexInDb',
                R.nth(
                  destinationIndex > sourceIndex
                    ? destinationIndex + 1
                    : destinationIndex - 1,
                  allTasks,
                ),
              ),
        allTasks,
        ...rest,
      }),
    )
    // .do(({ desIndexInDb, desSiblingIndexInDb }) =>
    //   console.log(desIndexInDb, desSiblingIndexInDb),
    // )
    .do(({ sourceId, desIndexInDb, desSiblingIndexInDb, allTasks }) =>
      postRequest('/dragTask')
        .send({
          sourceId,
          desIndexInDb,
          desSiblingIndexInDb,
        })
        .on('error', err => {
          // console.log('error eccured')
          dispatchSetAllTasks(allTasks)
          err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!')
        })
        .then(({ body: { _id, indexInDb } }) =>
          dispatchSetIndexInDb({
            _id,
            indexInDb,
          }),
        )
        .then(dispatchSetIsLoading(false)),
    )
    // .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

export default combineEpics(
  usersEpic,
  initialFetchEpic,
  deleteTaskEpic,
  loadMoreEpic,
  dragTaskEpic,
)
