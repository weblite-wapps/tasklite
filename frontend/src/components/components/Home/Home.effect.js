// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
// helpers
import { getQuery, mapToUsername } from './Home.helper'
import { getRequest, postRequest } from '../../../helper/functions/request.helper'
// actions
import {
  dispatchLoadTagsDataInAdd,
  dispatchLoadUsersDataInAdd,
  dispatchChangeAssigneeInAdd,
} from '../Add/Add.action'
import { dispatchLoadTagsDataInFilter } from '../Filter/Filter.action'
import {
  LOAD_MORE,
  dispatchChangePopoverId,
} from '../List/main/List.action'
import {
  FETCH_INITIAL_DATA,
  DELETE_TASK,
  dispatchLoadUsersData,
  dispatchLoadTasksData,
  dispatchSetIsLoading,
  dispatchLoadNumberOfTasks,
  dispatchUpdateNumbersObject,
} from './Home.action'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// views
import {
  wisView,
  userView,
  userIdView,
  userNameView,
} from './Home.reducer'


const usersEpic = action$ =>
  action$
    .ofType(FETCH_INITIAL_DATA)
    .mergeMap(() =>
      postRequest('/saveUser').send({
        wis: wisView(),
        userId: userIdView(),
        username: userNameView(),
      })
      .on(
        'error',
        err =>
          err.status !== 304 &&
          dispatchChangeSnackbarStage({ message: 'Server disconnected!' }),
      ),
    )
    .do(({
      body
    }) => body && dispatchLoadUsersData([body]))
    .do(() => dispatchChangeAssigneeInAdd(userView()))
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() })
      .on(
        'error',
        err =>
          err.status !== 304 &&
          dispatchChangeSnackbarStage({ message: 'Server disconnected!' }),
      ),
    )
    .do(({ body }) =>
      window.W && window.W.getUsersInfo(mapToUsername(body)).then(info => {
        const users = R.values(info)
        dispatchLoadUsersDataInAdd(users) 
        dispatchLoadUsersData(users)
      }))
    .ignoreElements()

const initialFetchEpic = action$ =>
  action$
    .ofType(FETCH_INITIAL_DATA)
    .do(() => window.W && window.W.start())
    .mergeMap(
      () => getRequest('/initialFetch').query(getQuery())
      .on(
        'error',
        err =>
          err.status !== 304 &&
          dispatchChangeSnackbarStage({ message: 'Server disconnected!' }),
      ),
    )
    .do(({
      body: {
        tasks
      }
    }) => dispatchLoadTasksData(tasks))
    .do(({
      body: {
        tags
      }
    }) => dispatchLoadTagsDataInAdd(tags))
    .do(({
      body: {
        tags
      }
    }) => dispatchLoadTagsDataInFilter(tags))
    .do(({
        body: {
          numberOfTasks
        }
      }) =>
      dispatchLoadNumberOfTasks(numberOfTasks),
    )
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

export default combineEpics(
  usersEpic,
  initialFetchEpic,
  deleteTaskEpic,
  loadMoreEpic,
)
