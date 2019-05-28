// modules
import {
  combineEpics
} from 'redux-observable'
import 'rxjs'
// import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import {
  getQuery
} from './App.helper'
import {
  getRequest,
  postRequest
} from '../../helper/functions/request.helper'
// actions
import {
  dispatchLoadTagsDataInAdd,
  dispatchLoadUsersDataInAdd,
  dispatchChangeAssigneeInAdd,
} from '../components/Add/Add.action'
import {
  dispatchLoadTagsDataInFilter
} from '../components/Filter/Filter.action'
import {
  LOAD_MORE,
  dispatchChangePopoverId,
} from '../components/List/main/List.action'
import {
  FETCH_INITIAL_DATA,
  DELETE_TASK,
  FETCH_ADMIN_DATA,
  loadUsersData,
  dispatchLoadTasksData,
  dispatchLoadUsersData,
  dispatchFetchAdminData,
  dispatchSetIsLoading,
  dispatchLoadNumberOfTasks,
  dispatchUpdateNumbersObject,
} from './App.action'
// views
import {
  wisView,
  userIdView,
  userNameView,
  creatorView,
  userView,
} from './App.reducer'
// W

const saveUsersEpic = action$ =>
  action$
  .ofType(FETCH_INITIAL_DATA)
  .mergeMap(
    () =>
    postRequest('/saveUser').send({
      wis: wisView(),
      userId: userIdView(),
      username: userNameView(),
    }),
    // .on(
    //   'error',
    //   err =>
    //     err.status !== 304 &&
    //     snackbarMessage({ message: 'Server disconnected!' }),
    // ),
  )
  .do(({
    body
  }) => body && dispatchLoadUsersData([body]))
  .do(() => dispatchChangeAssigneeInAdd(userView()))
  .map(dispatchFetchAdminData)

const fetchUsersEpic = action$ =>
  action$
  .ofType(FETCH_ADMIN_DATA)
  .filter(() => creatorView())
  .mergeMap(
    () => getRequest('/fetchUsers').query({
      wis: wisView()
    }),
    // .on(
    //   'error',
    //   err =>
    //     err.status !== 304 &&
    //     snackbarMessage({ message: 'Server disconnected!' }),
    // ),
  )
  .do(({
    body
  }) => dispatchLoadUsersDataInAdd(body))
  .map(({
    body
  }) => loadUsersData(body))

const initialFetchEpic = action$ =>
  action$
  .ofType(FETCH_INITIAL_DATA)
  .mergeMap(
    () => getRequest('/initialFetch').query(getQuery()),
    // .on(
    //   'error',
    //   err =>
    //     err.status !== 304 &&
    //     snackbarMessage({ message: 'Server disconnected!' }),
    // ),
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
  .do(() => window.W && window.W.setHooks())
  .ignoreElements()

const deleteTaskEpic = action$ =>
  action$
  .ofType(DELETE_TASK)
  .pluck('payload')
  .do(({
    task
  }) => dispatchUpdateNumbersObject(task.level, 'kind'))
  .do(() => dispatchSetIsLoading(true))
  .mergeMap(
    ({
      task: {
        _id
      }
    }) => postRequest('/deleteTask').query({
      _id
    }),
    // .on(
    //   'error',
    //   err =>
    //     err.status !== 304 &&
    //     snackbarMessage({ message: 'Server disconnected!' }),
    // ),
  )
  .do(() => dispatchSetIsLoading(false))
  // .do(() => snackbarMessage({ message: 'Deleted successfully !' }))
  .do(() => dispatchChangePopoverId(''))
  .do(() => window.W && window.W.analytics('DELETE_TASK'))
  .ignoreElements()

const loadMoreEpic = action$ =>
  action$
  .ofType(LOAD_MORE)
  .pluck('payload')
  .do(() => dispatchSetIsLoading(true))
  .mergeMap(
    ({
      skipLength,
      tabIndex
    }) =>
    getRequest('/loadMore').query({
      query: {
        ...getQuery(),
        level: tabIndex
      },
      skipLength,
    }),
    // .on(
    //   'error',
    //   err =>
    //     err.status !== 304 &&
    //     snackbarMessage({ message: 'Server disconnected!' }),
    // ),
  )
  .do(() => dispatchSetIsLoading(false))
  .do(({
    body
  }) => dispatchLoadTasksData(body))
  .do(() => window.W && window.W.analytics('LOAD_MORE_CLICK'))
  .ignoreElements()

export default combineEpics(
  fetchUsersEpic,
  saveUsersEpic,
  initialFetchEpic,
  deleteTaskEpic,
  loadMoreEpic,
)