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
  LOAD_USERS,
  dispatchAddTask,
  dispatchDeleteTask,
  dispatchUpdateNumbersObject,
  dispatchDeleteTodo,
  dispatchLoadUsersData,
  ADD_TODO,
  dispatchAddTodo,
  dispatchSetSentTime,
  TOGGLE_TODO,
  dispatchToggleTodo,
  CHANGE_LEVEL,
  dispatchChangeLevel,
} from './Home.action'
import { dispatchLoadUsersDataInAdd } from '../Add/Add.action'


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
    .do(({ data, type }) => type === DELETE_TODO && dispatchDeleteTodo(data))
    .do(({ data, type }) => type === TOGGLE_TODO && dispatchToggleTodo(data))
    .do(({ data, type }) => {
      if (type === CHANGE_LEVEL) {
        dispatchChangeLevel(data)
        dispatchUpdateNumbersObject(data.currentLevel, data.nextLevel)
        dispatchSetSentTime(data._id, new Date())
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
  fetchSingleTaskSubscribe,
  fetchNotingSubscribe,
) 
