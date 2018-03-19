// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../setup/redux'
// helpers
import { formatTime } from './App.helper'
import { formattedDate } from '../../helper/functions/date.helper'
// actions
import {
  SET_API,
  SET_ISLOADING,
  CHANGE_TAB,
  SET_SECONDS_ELAPSED,
  LOAD_USERS_DATA,
  LOAD_LOGS_DATA,
  CHANGE_POPOVER_ID,
  ADD_TASK,
  RESTORE_LOG,
  DELETE_LOG,
  CHANGE_EXPANDING_ID,
  TOGGLE_COMPLETED,
  CHANGE_LEVEL,
} from './App.action'

// state
const initialState = {
  tabIndex: 'ICE BOX',
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
        { title: 'handle database bug', completed: false, id: 'fakjfqlcml2kfgo' },
        { title: 'handle database bug', completed: true, id: 'fakjfqlcm3qkfgo' },
        { title: 'handle database bug', completed: false, id: 'fakjfql6mlqkfgo' },
        { title: 'handle kind bug', completed: true, id: 'fakjfqlc1lqkfgo' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
    },
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3o12f7',
      title: 'handle message microservice bugs',
      tags: ['bug', 'backend', 'weblite-web'],
      deadline: '2018-03-22T16:59:30.866Z',
      sentTime: '2018-03-21T16:59:30.866Z',
      priority: 3,
      level: 'EVALUTE',
      assignee: 'Masoud Mohammad Salehi',
      todos: [
        { title: 'handle datavase bug', completed: true, id: 'fakjfjlcmlqkfgo' },
        { title: 'handle kind bug', completed: false, id: 'fakjwqlcmlqkfgo' },
        { title: 'handle datavase bug', completed: false, id: 'fakqfqlcmlqkfgo' },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
    },
    {
      wis: '110',
      _id: 'dkqwokdok1o23k12k3o12f5',
      title: 'handle message microservice bugs',
      tags: ['bug', 'backend', 'weblite-web'],
      deadline: '2018-03-22T16:59:30.866Z',
      sentTime: '2018-03-21T16:59:30.866Z',
      priority: 3,
      level: 'DONE',
      assignee: 'Amirhossein Shafie',
      todos: [
        { title: 'handle datavase bug', completed: false },
        { title: 'handle kind bug', completed: false },
        { title: 'handle datavase bug', completed: false },
        { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
      ],
    },
  ],
}

// lens
const isLoadingLens = R.lensProp('isLoading')
const tabIndexLens = R.lensProp('tabIndex')
const endLens = R.lensProp('end')
const runningIdLens = R.lensProp('runningId')
const secondsElapsedLens = R.lensProp('secondsElapsed')
const popoverIdLens = R.lensProp('popoverId')
const completedLens = R.lensProp('completed')
// views
export const wisView = () => R.path(['App', 'wis'])(getState())
export const creatorView = () => R.path(['App', 'creator'])(getState())
export const userIdView = () => R.path(['App', 'user', 'id'])(getState())
export const userNameView = () => R.path(['App', 'user', 'name'])(getState())
export const logsView = () => R.path(['App', 'logs'])(getState())
export const usersView = () => R.path(['App', 'users'])(getState())
export const popoverIdView = () => R.path(['App', 'popoverId'])(getState())
export const runningIdView = () => R.path(['App', 'runningId'])(getState())
export const isLoadingView = () => R.path(['App', 'isLoading'])(getState())
export const secondsElapsedView = () => R.path(['App', 'secondsElapsed'])(getState())
export const tabIndexView = () => R.path(['App', 'tabIndex'])(getState())
export const expandingIdView = () => R.path(['App', 'expandingId'])(getState())
export const tasksView = () => R.path(['App', 'tasks'])(getState())

// reducers
const reducers = {
  [SET_API]: (state, { user, creator }) => ({ ...state, user, creator }),

  [SET_ISLOADING]: (state, { value }) => R.set(isLoadingLens, value, state),

  [CHANGE_TAB]: (state, { value }) => R.set(tabIndexLens, value, state),

  [LOAD_USERS_DATA]: (state, { users }) =>
    ({ ...state, users: R.uniq(R.concat(state.users, users)) }),

  [LOAD_LOGS_DATA]: (state, { logs }) => ({ ...state, logs: R.concat(state.logs, logs) }),

  [CHANGE_POPOVER_ID]: (state, { value }) => R.set(popoverIdLens, value, state),

  [ADD_TASK]: (state, { title, assignee, tags, priority, deadline }) => ({
    ...state,
    tasks: R.prepend(
      {
        _id: state.tasks.length,
        title,
        assignee,
        tags,
        priority,
        deadline,
        level: 'ICE BOX',
        todos: [
          { title: 'done', completed: false, id: 'fakjfjlcmlqgfgo' },
        ],
        wis: state.wis,
      },
      state.tasks),
  }),


  [RESTORE_LOG]: (state, { log }) => ({
    ...state,
    logs: R.adjust(R.assoc('_id', log._id), 0, state.logs),
  }),

  [DELETE_LOG]: (state, { _id }) => ({
    ...state,
    logs: R.remove(R.findIndex(R.propEq('_id', _id))(state.logs), 1, state.logs),
  }),

  [SET_SECONDS_ELAPSED]: (state, { value }) => R.set(secondsElapsedLens, value, state),

  [CHANGE_EXPANDING_ID]: (state, { _id }) => ({
    ...state,
    expandingId: state.expandingId === _id ? '' : _id,
  }),

  [TOGGLE_COMPLETED]: (state, { _id, id }) => ({
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
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
