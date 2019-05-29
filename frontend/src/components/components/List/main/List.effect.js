// modules
import { combineEpics } from 'redux-observable'
import * as R from 'ramda'
import 'rxjs'
import { push } from 'react-router-redux'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// actions
import {
  CHANGE_LEVEL,
  TOGGLE_TODO,
  ADD_TODO,
  DELETE_TODO,
  dispatchSetSentTime,
  dispatchSetIsLoading,
  dispatchRestoreTodo,
  dispatchUpdateNumbersObject,
} from '../../Home/Home.action'
import {
  dispatchChangeIsOpenDialog,
  dispatchInsertTask,
} from '../../Edit/Main/Edit.action'
import { EDIT_BUTTON_CLICK } from './List.action'
// helpers
import { postRequest } from '../../../../helper/functions/request.helper'
// views
import { tasksView, userNameView } from '../../Home/Home.reducer'

const changeLevelEpic = action$ =>
  action$
    .ofType(CHANGE_LEVEL)
    .pluck('payload')
    .do(({ currentLevel, nextLevel }) =>
      dispatchUpdateNumbersObject(currentLevel, nextLevel),
    )
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, currentLevel, nextLevel, title }) =>
      postRequest('/changeLevel')
        .send({
          _id,
          currentLevel,
          nextLevel,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        )
        .then(({ body }) => ({
          _id,
          currentLevel,
          nextLevel,
          body,
          title,
        })),
    )
    .do(({ nextLevel, title }) => {
      Window.W &&
        Window.W.sendNotificationToAll(
          'Tasklite',
          `${title.toUpperCase()} sent to ${nextLevel} by ${userNameView()}`,
        )
    })
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) =>
      dispatchChangeSnackbarStage(`Dropped to ${body.nextLevel}`),
    )
    .filter(({ body }) => body.nextLevel === 'EVALUATE')
    .do(({ body }) => dispatchSetSentTime(body._id, new Date()))
    .mergeMap(({ body: { _id } }) =>
      postRequest('/setSentTime')
        .send({
          _id,
          sentTime: new Date(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => window.W && window.W.analytics('CHANGE_LEVEL'))
    .ignoreElements()

const toggleTodoEpic = action$ =>
  action$
    .ofType(TOGGLE_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, todoId }) =>
      postRequest('/toggleTodo')
        .send({
          _id,
          todoId,
          task: R.find(R.propEq('_id', _id), tasksView()),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(() => window.W && window.W.analytics('TOGGLE_TODO'))
    .ignoreElements()

const addTodoEpic = action$ =>
  action$
    .ofType(ADD_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, value }) =>
      postRequest('/addTodo')
        .send({
          _id,
          value,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchRestoreTodo(body[0]))
    .do(() => window.W && window.W.analytics('ADD_TODO'))
    .ignoreElements()

const removeTodoEpic = action$ =>
  action$
    .ofType(DELETE_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, todoId }) =>
      postRequest('/deleteTodo')
        .send({
          _id,
          todoId,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(() => window.W && window.W.analytics('DELETE_TODO'))
    .ignoreElements()

const handleEditButtonEpic = action$ =>
  action$
    .ofType(EDIT_BUTTON_CLICK)
    .pluck('payload')
    .do(dispatchInsertTask)
    .do(() => dispatchChangeIsOpenDialog(true))
    .map(() => push('/Edit'))

export default combineEpics(
  changeLevelEpic,
  toggleTodoEpic,
  addTodoEpic,
  removeTodoEpic,
  handleEditButtonEpic,
)
