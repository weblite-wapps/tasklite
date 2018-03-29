// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import * as R from 'ramda'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// actions
import {
  CHANGE_LEVEL,
  TOGGLE_TODO,
  ADD_TODO,
  DELETE_TODO,
  setSentTime,
  dispatchSetIsLoading,
  dispatchRestoreTodo,
} from '../../../Main/App.action'
// helpers
import { postRequest } from '../../../../helper/functions/request.helper'
// views
import { tasksView } from '../../../Main/App.reducer'


const changeLevelEpic = action$ =>
  action$.ofType(CHANGE_LEVEL)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, nextLevel }) => postRequest('/changeLevel')
      .send({ _id, nextLevel })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => snackbarMessage({ message: `Dropped to ${body.nextLevel}` }))
    .filter(({ body }) => body.nextLevel === 'EVALUTE')
    .map(({ body }) => setSentTime(body._id, new Date()))

const toggleTodoEpic = action$ =>
  action$.ofType(TOGGLE_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, todoId }) => postRequest('/toggleTodo')
      .send({ _id, todoId, task: R.find(R.propEq('_id', _id), tasksView()) })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

const addTodoEpic = action$ =>
  action$.ofType(ADD_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, value }) => postRequest('/addTodo')
      .send({ _id, value })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchRestoreTodo(body[0]))
    .ignoreElements()

const removeTodoEpic = action$ =>
  action$.ofType(DELETE_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, todoId }) => postRequest('/deleteTodo')
      .send({ _id, todoId })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

export default combineEpics(
  changeLevelEpic,
  toggleTodoEpic,
  addTodoEpic,
  removeTodoEpic,
)
