// modules
import { combineEpics } from 'redux-observable'
import * as R from 'ramda'
import 'rxjs'
import { push } from 'react-router-redux'
import jMoment from 'moment-jalaali'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// actions
import {
  HANDLE_CHANGE_LEVEL,
  CHANGE_LEVEL,
  HANDLE_TOGGLE_TODO,
  TOGGLE_TODO,
  HANDLE_ADD_TODO,
  ADD_TODO,
  HANDLE_DELETE_TODO,
  DELETE_TODO,
  DRAG_TODO,
  dispatchSetIsLoading,
  dispatchSetEditedTask,
} from '../../Home/Home.action'
import {
  dispatchChangeIsOpenDialog,
  dispatchInsertTask,
  dispatchUpdateTagsDataInEdit,
} from '../../Edit/Main/Edit.action'
import { EDIT_BUTTON_CLICK, HANDLE_DRAG_TODO } from './List.action'
// helpers
import { postRequest } from '../../../../helper/functions/request.helper'
// views
import { tasksView, userNameView, tabIndexView } from '../../Home/Home.reducer'
import { updateTodosInFront } from '../../Home/Home.helper'
import { pulse } from '../../../../helper/functions/realtime.helper'

const changeLevelEpic = action$ =>
  action$
    .ofType(HANDLE_CHANGE_LEVEL)
    .pluck('payload')
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
        .then(() => ({
          _id,
          currentLevel,
          nextLevel,
          title,
        })),
    )
    .do(({ _id, currentLevel, nextLevel }) =>
      pulse(CHANGE_LEVEL, { _id, currentLevel, nextLevel }),
    )
    .do(({ nextLevel, title }) => {
      window.W &&
        window.W.sendNotificationToAll(
          'Tasklite',
          `${title.toUpperCase()} sent to ${nextLevel} by ${userNameView()}`,
        )
    })
    .do(() => dispatchSetIsLoading(false))
    .do(({ nextLevel }) =>
      dispatchChangeSnackbarStage(`Dropped to ${nextLevel}`),
    )
    .filter(({ nextLevel }) => nextLevel === 'EVALUATE')
    .mergeMap(({ _id }) =>
      postRequest('/setSentTime')
        .send({
          _id,
          sentTime: jMoment(),
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
    .ofType(HANDLE_TOGGLE_TODO)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ _id, todoId, completed }) =>
      postRequest('/toggleTodo')
        .send({
          _id,
          todoId,
          completed,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        )
        .then(() => ({ _id, todoId })),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ _id, todoId }) => pulse(TOGGLE_TODO, { _id, todoId }))
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
    .do(({ body }) => pulse(ADD_TODO, body[0]))
    .do(() => window.W && window.W.analytics('ADD_TODO'))
    .ignoreElements()

const removeTodoEpic = action$ =>
  action$
    .ofType(HANDLE_DELETE_TODO)
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
        )
        .then(() => ({ _id, todoId })),
    )
    .do(() => dispatchSetIsLoading(false))
    .do(({ _id, todoId }) => pulse(DELETE_TODO, { _id, todoId }))
    .do(() => window.W && window.W.analytics('DELETE_TODO'))
    .ignoreElements()

const handleEditButtonEpic = action$ =>
  action$
    .ofType(EDIT_BUTTON_CLICK)
    .pluck('payload')
    .do(dispatchInsertTask)
    .pluck('tags')
    .do(dispatchUpdateTagsDataInEdit)
    .do(() => dispatchChangeIsOpenDialog(true))
    .map(() => push('/Edit'))

//TODO: THIS EPIC AND IT'S HELPER FUNCTION SHOULD BE REFACTORED
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
    .map(({ e: { source, destination }, task_id, todos, ...rest }) => ({
      source: R.prop('index', source),
      destination: R.prop('index', destination),
      sourceTask: R.find(R.propEq('_id', task_id), tasksView()),
      sourceId: R.prop('_id', R.nth(R.prop('index', source), todos)),
      destOrder: R.prop('order', R.nth(R.prop('index', destination), todos)),
      todos,
      ...rest,
    }))
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
    .do(({ sourceTask }) => pulse(DRAG_TODO, sourceTask))
    .do(
      () =>
        window.W &&
        window.W.analytics('DRAG_AND_DROP_TODO', { stage: tabIndexView() }),
    )
    .mergeMap(({ sourceTaskId, sourceTask, notChangedSourceTask }) =>
      postRequest('/dragTodo')
        .send({
          sourceTaskId,
          todos: R.prop('todos', sourceTask),
        })
        .on('error', err => {
          dispatchSetEditedTask(notChangedSourceTask)
          err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!')
        }),
    )
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
