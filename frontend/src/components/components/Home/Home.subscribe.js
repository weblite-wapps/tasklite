// modules
import { combineEpics } from 'redux-observable'
import jMoment from 'moment-jalaali'
import 'rxjs'
// actions
import {
  ADD_TASK,
  DELETE_TASK,
  DELETE_TODO,
  HANDLE_REAL_TIME,
  LOAD_USERS,
  ADD_TODO,
  TOGGLE_TODO,
  CHANGE_LEVEL,
  SET_ALL_TASKS,
  DRAG_TASK,
  DRAG_TODO,
  SET_EDITED_TASK,
  dispatchAddTask,
  dispatchDeleteTask,
  dispatchUpdateNumbersObject,
  dispatchDeleteTodo,
  dispatchLoadUsersData,
  dispatchAddTodo,
  dispatchSetSentTime,
  dispatchToggleTodo,
  dispatchChangeLevel,
  dispatchSetOrder,
  dispatchSetAllTasks,
  dispatchSetEditedTask,
} from './Home.action'
import { dispatchLoadUsersDataInAdd } from '../Add/Add.action'

// TODO: refactor with helper
const fetchNotingSubscribe = action$ =>
  action$
    .ofType(HANDLE_REAL_TIME)
    .pluck('payload')
    .do(({ data, type }) => type === SET_ALL_TASKS && dispatchSetAllTasks(data))
    .do(({ data, type }) => type === DRAG_TASK && dispatchSetOrder(data))
    .do(({ data, type }) => type === ADD_TASK && dispatchAddTask(data))
    .do(({ data, type }) => type === ADD_TODO && dispatchAddTodo(data))
    .do(({ data, type }) => type === DELETE_TODO && dispatchDeleteTodo(data))
    .do(({ data, type }) => type === TOGGLE_TODO && dispatchToggleTodo(data))
    .do(({ data, type }) => type === DRAG_TODO && dispatchSetEditedTask(data))
    .do(({ data, type }) => type === SET_EDITED_TASK && dispatchSetEditedTask(data))
    .do(({ data, type }) => {
      if (type === DELETE_TASK) {
        dispatchDeleteTask(data)
        dispatchUpdateNumbersObject(data.level, 'kind')
      }
    })
    .do(({ data, type }) => {
      if (type === CHANGE_LEVEL) {
        dispatchChangeLevel(data)
        dispatchUpdateNumbersObject(data.currentLevel, data.nextLevel)
        dispatchSetSentTime(data._id, jMoment())
      }
    })
    .do(({ data, type }) => {
      if (type === LOAD_USERS) {
        dispatchLoadUsersDataInAdd(data)
        dispatchLoadUsersData(data)
      }
    })
    .ignoreElements()

export default combineEpics(
  fetchNotingSubscribe,
) 
