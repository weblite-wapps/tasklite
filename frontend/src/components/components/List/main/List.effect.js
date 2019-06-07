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
  HANDLE_ADD_TODO,
  DELETE_TODO,
  dispatchSetSentTime,
  dispatchSetIsLoading,
  dispatchAddTodo,
  dispatchUpdateNumbersObject,
  dispatchSetEditedTask,
} from '../../Home/Home.action'
import {
  dispatchChangeIsOpenDialog,
  dispatchInsertTask,
} from '../../Edit/Main/Edit.action'
import { EDIT_BUTTON_CLICK, HANDLE_DRAG_TODO } from './List.action'
// helpers
import { postRequest } from '../../../../helper/functions/request.helper'
// views
import { tasksView, userNameView } from '../../Home/Home.reducer'
import { updateTodosInFront } from '../../Home/Home.helper'

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
      window.W &&
        window.W.sendNotificationToAll(
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
    .ofType(HANDLE_ADD_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .map(({ _id, ...rest }) => ({
      order:
        R.reduce(
          (acc, item) => (item > acc ? (acc = item) : acc),
          -1000000,
          R.pluck(
            'order',
            R.prop('todos', R.find(R.propEq('_id', _id), tasksView())),
          ),
        ) + 100 || 100,
      _id,
      ...rest,
    }))
    // .do(console.log)
    .mergeMap(({ _id, value, order }) =>
      postRequest('/addTodo')
        .send({
          _id,
          value,
          order: order === -999900 ? 100 : order,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ body }) => dispatchAddTodo(body[0]))
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

const handleDragTodoEpic = action$ =>
  action$
    .ofType(HANDLE_DRAG_TODO)
    .pluck('payload')
    .filter(
      ({ e: { destination } }) =>
        (destination && destination.index > -1) ||
        (() => {
          dispatchChangeSnackbarStage('Destination must be in task list zone')
          return false
        })(),
    )
    .do(() => dispatchSetIsLoading(true))
    // .do(console.log)

    .map(({ e: { source, destination }, task_id, todos, ...rest }) => ({
      source: R.prop('index', source),
      destination: R.prop('index', destination),
      sourceTask: R.find(R.propEq('_id', task_id), tasksView()),
      sourceId: R.prop('_id', R.nth(R.prop('index', source), todos)),
      destOrder: R.prop('order', R.nth(R.prop('index', destination), todos)),
      todos,
      ...rest,
    }))

    // .do(({ source, destination, sourceTask }) => {
    //   dispatchSetEditedTask(updateTodosInFront(source, destination, sourceTask))
    // })

    .map(({ source, destination, destOrder, todos, ...rest }) => ({
      destSiblingOrder:
        destination + 1 === R.length(todos)
          ? destOrder - 100
          : !destination
          ? destOrder + 100
          : R.prop(
              'order',
              R.nth(
                destination > source ? destination + 1 : destination - 1,
                todos,
              ),
            ),
      destOrder,
      source,
      destination,
      ...rest,
    }))
    .map(({ sourceId, sourceTask, destOrder, destSiblingOrder, ...rest }) => ({
      sourceTaskId: R.prop('_id', sourceTask),
      notChangedSourceTask: sourceTask,
      sourceTask: {
        ...sourceTask,
        todos: R.map(
          todo =>
            todo._id === sourceId
              ? { ...todo, order: (destOrder + destSiblingOrder) / 2 }
              : todo,
          sourceTask.todos,
        ),
      },
      ...rest,
    }))

    .map(({ source, destination, sourceTask, ...rest }) => ({
      sourceTask: updateTodosInFront(source, destination, sourceTask),
      ...rest,
    }))

    .do(({ sourceTaskId, sourceTask, notChangedSourceTask }) => {
      dispatchSetEditedTask(sourceTask)
      postRequest('/dragTodo')
        .send({
          sourceTaskId,
          todos: R.prop('todos', sourceTask),
        })
        .on('error', err => {
          dispatchSetEditedTask(notChangedSourceTask)
          err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!')
        })
        // .then(({ body: { _id, order } }) =>
        //   dispatchSetTodoOrder({
        //     _id,
        //     todo_id: sourceId,
        //     order,
        //   }),
        // )
        .then(dispatchSetIsLoading(false))
    })
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

export default combineEpics(
  changeLevelEpic,
  toggleTodoEpic,
  addTodoEpic,
  removeTodoEpic,
  handleEditButtonEpic,
  handleDragTodoEpic,
)
