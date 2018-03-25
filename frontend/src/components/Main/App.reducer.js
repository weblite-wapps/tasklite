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
  DELETE_TODO,
  SET_SENT_TIME,
  CHANGE_EXPAND_MODE,
} from './App.action'

// state
const initialState = {
  tabIndex: 'ICE BOX',
  expandMode: 'default',
  isLoading: false,
  popoverId: '',
  runningId: '',
  expandingId: '',
  secondsElapsed: 0,
  users: [],
  user: {},
  wis: (window.W && window.W.wisId) || '110',
  creator: false,
  tasks: [
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3o12k3',
      title: 'refactoring loglite',
      tags: ['refactor', 'loglite'],
      deadline: '2018-03-11T16:59:30.866Z',
      sentTime: '2018-03-20T16:59:30.866Z',
      priority: 1,
      level: 'ICE BOX',
      assignee: 'Mostafa Mohseni Kabir',
      todos: [
        { title: 'change namespaces', completed: true, id: 'fakjfqlcmlqkfgo' },
        { title: 'handle views and lens', completed: true, id: 'fakjfqlcmlqkfg2' },
        { title: 'handle views and lens', completed: true, id: 'fakjfqlcmlqkfg4' },
        { title: 'handle views and lens', completed: false, id: 'fakjfqlcmlqkfg6' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
      todoText: '',
    },
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3o12f4',
      title: 'handle message microservice bugs',
      tags: ['bug', 'backend', 'weblite-web', 'servies'],
      deadline: '2018-03-22T16:59:30.866Z',
      sentTime: '2018-03-21T16:59:30.866Z',
      priority: 2,
      level: 'IN PROGRESS',
      assignee: 'Ali Asgary',
      todos: [
        { title: 'handle database bug', completed: false, id: 'fakjfggqlcml2kfgo' },
        { title: 'handle database bug', completed: true, id: 'fakjfqlcm3qkfgo' },
        { title: 'handle database bug', completed: false, id: 'fakjfql6mlqkfgo' },
        { title: 'handle kind bug', completed: true, id: 'fakjfqlc1lqkfgo' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
      todoText: '',
    },
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3odaf12f7',
      title: 'handle message microservice bugs',
      tags: ['bug', 'backend', 'weblite-web'],
      deadline: '2018-03-22T16:59:30.866Z',
      sentTime: '2018-03-21T16:59:30.866Z',
      priority: 3,
      level: 'EVALUTE',
      assignee: 'Masoud Mohammad Salehi',
      todos: [
        { title: 'handle datavase bug', completed: true, id: 'fakjfjlcmlqkfdasgo' },
        { title: 'handle kind bug', completed: false, id: 'fakjwqlcmlqkfgo' },
        { title: 'handle datavase bug', completed: false, id: 'fakqfqlcmlqkfgo' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
      todoText: '',
    },
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3o1qda2f5',
      title: 'handle message microservice bugs',
      tags: ['bug', 'backend', 'weblite-web'],
      deadline: '2018-03-22T16:59:30.866Z',
      sentTime: '2018-03-21T16:59:30.866Z',
      priority: 3,
      level: 'DONE',
      assignee: 'Amirhossein Shafie',
      todos: [
        { title: 'handle datavase bug', completed: false, id: 'fakjffjlcmlqgfgo' },
        { title: 'handle kind bug', completed: false, id: 'fakjfjalcmlqgfgo' },
        { title: 'handle datavase bug', completed: false, id: 'fakjfjlchmlqgfgo' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
      todoText: '',
    },
  ],
}

// lens
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const popoverIdLens = R.lensProp('popoverId')
const completedLens = R.lensProp('completed')
const expandModeLens = R.lensProp('expandMode')
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

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) =>
    ({ ...state, users: R.uniq(R.concat(state.users, users)) }),

  [LOAD_TASKS_DATA]: (state, { tasks }) => ({ ...state, tasks: R.concat(state.tasks, tasks) }),

  [CHANGE_POPOVER_ID]: (state, { value }) => R.set(popoverIdLens, value, state),

  [ADD_TASK]: (state, { title, assignee, tags, priority, deadline }) => ({
    ...state,
    tasks: R.prepend(
      {
        _id: state.tasks.length.toString(),
        title,
        assignee,
        tags,
        priority,
        deadline,
        level: 'ICE BOX',
        todos: [
          { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
        ],
        todoText: '',
        sentTime: '',
        wis: state.wis,
      },
      state.tasks),
  }),


  [RESTORE_TASK]: (state, { task }) => ({
    ...state,
    tasks: R.adjust(R.assoc('_id', task._id), 0, state.tasks),
  }),

  [DELETE_TASK]: (state, { _id }) => ({
    ...state,
    tasks: R.remove(R.findIndex(R.propEq('_id', _id))(state.tasks), 1, state.tasks),
  }),

  [CHANGE_EXPANDING_ID]: (state, { _id }) => ({
    ...state,
    expandingId: state.expandingId === _id ? '' : _id,
  }),

  [TOGGLE_TODO]: (state, { _id, id }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.map(todo => (todo.id === id) ?
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
          title: value, completed: false, id: Math.floor(Math.random() * 100000000) }, task.todos),
      } : task, state.tasks),
  }),

  [DELETE_TODO]: (state, { _id, id }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ?
      {
        ...task,
        todos: R.remove(R.findIndex(R.propEq('id', id), task.todos), 1, task.todos),
      } : task, state.tasks),
  }),

  [SET_SENT_TIME]: (state, { _id, time }) => ({
    ...state,
    tasks: R.map(task => (task._id === _id) ? { ...task, sentTime: time } : task, state.tasks),
  }),

  [CHANGE_EXPAND_MODE]: (state, { newMode }) => R.set(expandModeLens, newMode, state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
