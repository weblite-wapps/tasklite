// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../setup/redux'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  LOAD_USERS_DATA,
  LOAD_TASKS_DATA,
  CHANGE_POPOVER_ID,
  ADD_TASK,
  RESTORE_TASK,
  DELETE_TASK,
  CHANGE_EXPANDING_ID,
  CHANGE_LEVEL,
  CHANGE_TODO_TEXT,
  TOGGLE_TODO,
  ADD_TODO,
  RESTORE_TODO,
  DELETE_TODO,
  SET_SENT_TIME,
  CHANGE_EXPAND_MODE,
  LOAD_NUMBER_OF_TASKS,
  SET_ABOUT_MODE,
  UPDATE_NUMBERS_OBJECT,
} from './App.action'
// helpers
import { getUpdatedNumbersObject } from './App.helper'

// state
const initialState = {
  tabIndex: 'ICE BOX',
  aboutMode: false,
  expandMode: 'default',
  isLoading: false,
  popoverId: '',
  expandingId: '',
  secondsElapsed: 0,
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
const popoverIdLens = R.lensProp('popoverId')
const completedLens = R.lensProp('completed')
const expandModeLens = R.lensProp('expandMode')
const numbersObjectLens = R.lensProp('numbersObject')
const aboutModeLens = R.lensProp('aboutMode')
// views
export const wisView = () => R.path(['App', 'wis'])(getState())
export const creatorView = () => R.path(['App', 'creator'])(getState())
export const userIdView = () => R.path(['App', 'user', 'id'])(getState())
export const userNameView = () => R.path(['App', 'user', 'name'])(getState())
export const logsView = () => R.path(['App', 'logs'])(getState())
export const usersView = () => R.path(['App', 'users'])(getState())
export const popoverIdView = () => R.path(['App', 'popoverId'])(getState())
export const isLoadingView = () => R.path(['App', 'isLoading'])(getState())
export const tabIndexView = () => R.path(['App', 'tabIndex'])(getState())
export const expandingIdView = () => R.path(['App', 'expandingId'])(getState())
export const tasksView = () => R.path(['App', 'tasks'])(getState())
export const expandModeView = () => R.path(['App', 'expandMode'])(getState())
export const numbersObjectView = () => R.path(['App', 'numbersObject'])(getState())
export const aboutModeView = () => R.path(['App', 'aboutMode'])(getState())

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) =>
    ({ ...state, users: R.uniq(R.concat(state.users, users)) }),

  [LOAD_TASKS_DATA]: (state, { tasks }) => ({
    ...state,
    tasks: R.compose(
      R.uniq(),
      R.concat(state.tasks, R.__),
      R.map(task => R.assoc('todoText', '', task)),
    )(tasks),
  }),

  [CHANGE_POPOVER_ID]: (state, { value }) => R.set(popoverIdLens, value, state),

  [ADD_TASK]: (state, { title, selectedUser, tags, priority, deadline }) => ({
    ...state,
    tasks: R.prepend(
      {
        _id: state.tasks.length.toString(),
        title,
        assignee: selectedUser.name,
        tags,
        priority,
        deadline,
        level: 'ICE BOX',
        todos: [{ title: 'done', completed: false, _id: 'fakjfjlcmlqgfgo' }],
        todoText: '',
        sentTime: '',
        wis: state.wis,
      },
      state.tasks),
  }),


  [RESTORE_TASK]: (state, { task }) => ({
    ...state,
    tasks: R.compose(
      R.adjust(R.assoc('todoText', ''), 0),
      R.adjust(R.assoc('_id', task._id), 0),
    )(state.tasks),
  }),

  [DELETE_TASK]: (state, { _id }) => ({
    ...state,
    tasks: R.remove(R.findIndex(R.propEq('_id', _id))(state.tasks), 1, state.tasks),
  }),

  [CHANGE_EXPANDING_ID]: (state, { _id }) => ({
    ...state,
    expandingId: state.expandingId === _id ? '' : _id,
  }),

  [TOGGLE_TODO]: (state, { _id, todoId }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.map(todo => (todo._id === todoId) ?
          R.set(completedLens, !todo.completed, todo) : todo, task.todos),
      } : task, state.tasks),
  }),

  [CHANGE_LEVEL]: (state, { _id, nextLevel }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      { ...task, level: nextLevel } : task, state.tasks),
  }),

  [CHANGE_TODO_TEXT]: (state, { _id, value }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      { ...task, todoText: value } : task, state.tasks),
  }),

  [ADD_TODO]: (state, { _id, value }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.prepend({
          title: value, completed: false, _id: task.todos.length.toString() }, task.todos),
      } : task, state.tasks),
  }),

  [RESTORE_TODO]: (state, { task: { _id, todos } }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.adjust(R.assoc('_id', todos[0]._id), 0, task.todos),
      } : task, state.tasks),
  }),

  [DELETE_TODO]: (state, { _id, todoId }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.remove(R.findIndex(R.propEq('_id', todoId), task.todos), 1, task.todos),
      } : task, state.tasks),
  }),

  [SET_SENT_TIME]: (state, { _id, time }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ? { ...task, sentTime: time } : task, state.tasks),
  }),

  [CHANGE_EXPAND_MODE]: (state, { newMode }) => R.set(expandModeLens, newMode, state),

  [LOAD_NUMBER_OF_TASKS]: (state, { value }) => R.set(numbersObjectLens, value, state),

  [SET_ABOUT_MODE]: (state, { value }) => R.set(aboutModeLens, value, state),

  [UPDATE_NUMBERS_OBJECT]: (state, { currentLevel, nextLevel }) =>
    R.set(numbersObjectLens, getUpdatedNumbersObject(currentLevel, nextLevel), state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
