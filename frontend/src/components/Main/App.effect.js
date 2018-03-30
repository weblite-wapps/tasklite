// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getQuery } from './App.helper'
import { getRequest, postRequest } from '../../helper/functions/request.helper'
// actions
import { dispatchLoadTagsDataInAdd, dispatchLoadUsersDataInAdd } from '../components/Add/Main/Add.action'
import { dispatchLoadTagsDataInFilter } from '../components/Filter/Filter.action'
import {
  FETCH_TODAY_DATA,
  DELETE_TASK,
  FETCH_ADMIN_DATA,
  loadUsersData,
  dispatchLoadTasksData,
  dispatchLoadUsersData,
  dispatchFetchAdminData,
  dispatchSetIsLoading,
  dispatchChangePopoverId,
} from './App.action'
// views
import { wisView, userIdView, userNameView, creatorView } from './App.reducer'


const saveUsersEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => postRequest('/saveUser')
      .send({ wis: wisView(), userId: userIdView(), username: userNameView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => body && dispatchLoadUsersData([body]))
    .map(dispatchFetchAdminData)


const fetchUsersEpic = action$ =>
  action$.ofType(FETCH_ADMIN_DATA)
    .filter(() => creatorView())
    .mergeMap(() => getRequest('/fetchUsers')
      .query({ wis: wisView() })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body }) => dispatchLoadUsersDataInAdd(body))
    .map(({ body }) => loadUsersData((body)))


const initialFetchEpic = action$ =>
  action$.ofType(FETCH_TODAY_DATA)
    .mergeMap(() => getRequest('/initialFetch')
      .query(getQuery())
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(({ body: { tasks } }) => dispatchLoadTasksData(tasks))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInAdd(tags))
    .do(({ body: { tags } }) => dispatchLoadTagsDataInFilter(tags))
    .do(() => window.W && window.W.start())
    .ignoreElements()


const deleteTaskEpic = action$ =>
  action$.ofType(DELETE_TASK)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(action => postRequest('/deleteTask')
      .query({ _id: action.payload._id })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(true))
    .do(() => snackbarMessage({ message: 'Deleted successfully !' }))
    .do(() => dispatchChangePopoverId(''))
    .ignoreElements()


export default combineEpics(
  fetchUsersEpic,
  saveUsersEpic,
  initialFetchEpic,
  deleteTaskEpic,
)
