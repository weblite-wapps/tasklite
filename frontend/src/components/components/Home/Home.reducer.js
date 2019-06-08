// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_USERS_DATA,
  LOAD_TASKS_DATA,
  ADD_TASK,
  DELETE_TASK,
  CHANGE_LEVEL,
  CHANGE_TODO_TEXT,
  TOGGLE_TODO,
  ADD_TODO,
  DELETE_TODO,
  SET_SENT_TIME,
  LOAD_NUMBER_OF_TASKS,
  UPDATE_NUMBERS_OBJECT,
  SET_EDITED_TASK,
  SET_ALL_TASKS,
  SET_ORDER,
} from './Home.action'
// helpers
import { getUpdatedNumbersObject } from './Home.helper'

// state
const initialState = {
  tabIndex: 'ICE BOX',
  isLoading: false,
  users: [],
  user: {},
  wis: (window.W && window.W.wisId) || '110',
  creator: false,
  tasks: [],
  numbersObject: {},
}

// lens
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const completedLens = R.lensProp('completed')
const numbersObjectLens = R.lensProp('numbersObject')
// views
export const wisView = () => R.path(['Home', 'wis'])(getState())
export const creatorView = () => R.path(['Home', 'creator'])(getState())
export const userView = () => R.path(['Home', 'user'])(getState())
export const userIdView = () => R.path(['Home', 'user', 'id'])(getState())
export const userNameView = () => R.path(['Home', 'user', 'name'])(getState())
export const logsView = () => R.path(['Home', 'logs'])(getState())
export const usersView = () => R.path(['Home', 'users'])(getState())
export const isLoadingView = () => R.path(['Home', 'isLoading'])(getState())
export const tabIndexView = () => R.path(['Home', 'tabIndex'])(getState())
export const tasksView = () => R.path(['Home', 'tasks'])(getState())
export const numbersObjectView = () =>
  R.path(['Home', 'numbersObject'])(getState())

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({
    ...state,
    user,
    creator,
  }),

  [SET_ISLOADING]: (state, value) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, value) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, users) => ({
    ...state,
    users: R.uniq(R.concat(state.users, users)),
  }),

  [LOAD_TASKS_DATA]: (state, tasks) => ({
    ...state,
    tasks: R.compose(
      R.uniq(),
      R.concat(state.tasks, R.__),
      R.map(task => R.assoc('todoText', '', task)),
    )(tasks),
  }),

  [ADD_TASK]: (state, task) => ({
    ...state,
    tasks: R.compose(
      R.adjust(0, R.assoc('todoText', '')),
      R.prepend(task),
    )(state.tasks),
  }),

  [DELETE_TASK]: (state, { task: { _id } }) => ({
    ...state,
    tasks: R.remove(
      R.findIndex(R.propEq('_id', _id))(state.tasks),
      1,
      state.tasks,
    ),
  }),

  [TOGGLE_TODO]: (state, { _id, todoId }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              todos: R.map(
                todo =>
                  todo._id === todoId
                    ? R.set(completedLens, !todo.completed, todo)
                    : todo,
                task.todos,
              ),
            }
          : task,
      state.tasks,
    ),
  }),

  [CHANGE_LEVEL]: (state, { _id, nextLevel }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              level: nextLevel,
            }
          : task,
      state.tasks,
    ),
  }),

  [CHANGE_TODO_TEXT]: (state, { _id, value }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              todoText: value,
            }
          : task,
      state.tasks,
    ),
  }),

  [ADD_TODO]: (state, { _id, todos }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              todos,
            }
          : task,
      state.tasks,
    ),
  }),

  [DELETE_TODO]: (state, { _id, todoId }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              todos: R.remove(
                R.findIndex(R.propEq('_id', todoId), task.todos),
                1,
                task.todos,
              ),
            }
          : task,
      state.tasks,
    ),
  }),

  [SET_SENT_TIME]: (state, { _id, time }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              sentTime: time,
            }
          : task,
      state.tasks,
    ),
  }),

  [LOAD_NUMBER_OF_TASKS]: (state, value) =>
    R.set(numbersObjectLens, value, state),

  [UPDATE_NUMBERS_OBJECT]: (state, { currentLevel, nextLevel }) =>
    R.set(
      numbersObjectLens,
      getUpdatedNumbersObject(currentLevel, nextLevel),
      state,
    ),
  [SET_EDITED_TASK]: (state, newTask) => ({
    ...state,
    tasks: R.map(
      task => (task._id === newTask._id ? newTask : task),
      state.tasks,
    ),
  }),

  [SET_ALL_TASKS]: (state, tasks) => ({
    ...state,
    tasks,
  }),

  [SET_ORDER]: (state, { _id, order }) => ({
    ...state,
    tasks: R.map(
      task =>
        task._id === _id
          ? {
              ...task,
              order,
            }
          : task,
      state.tasks,
    ),
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
