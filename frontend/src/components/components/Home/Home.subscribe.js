// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
// actions
import {
  ADD_TASK,
  DELETE_TASK,
  DELETE_TODO,
  FETCH_SINGLE_TASK,
  FETCH_NOTING,
  FETCH_ALL_USERS,
  FETCH_ALL_TASKS,
  dispatchSetIsLoading,
  dispatchAddTask,
  dispatchDeleteTask,
  dispatchUpdateNumbersObject,
  dispatchDeleteTodo,
  dispatchLoadUsersData,
  ADD_TODO,
  dispatchAddTodo,
} from './Home.action'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
import { dispatchLoadUsersDataInAdd } from '../Add/Add.action'
// helpers
import { getRequest } from '../../../helper/functions/request.helper'
import { getQuery, mapToUsername } from './Home.helper'
// views
import { wisView } from './Home.reducer'

const fetchSingleTaskSubscribe = action$ =>
  action$
    .ofType(FETCH_SINGLE_TASK)
    .pluck('payload')
    .ignoreElements()

const fetchNotingSubscribe = action$ =>
  action$
    .ofType(FETCH_NOTING)
    .pluck('payload')
    .do(({ data, type }) => type === ADD_TASK && dispatchAddTask(data))
    .do(({ data, type }) => type === ADD_TODO && dispatchAddTodo(data))
    .do(({ data, type }) => {
      if (type === DELETE_TASK) {
        dispatchDeleteTask(data)
        dispatchUpdateNumbersObject(data.level, 'kind')
      }
    })
    .do(console.log)
    .do(({ data, type }) => type === DELETE_TODO && dispatchDeleteTodo(data))
    .ignoreElements()

const fetchAllUsersSubscribe = action$ =>
  action$
    .ofType(FETCH_ALL_USERS)
    .do(() => dispatchSetIsLoading(true))
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

export default combineEpics(
  fetchSingleTaskSubscribe,
  fetchNotingSubscribe,
  fetchAllUsersSubscribe,
  ) 
