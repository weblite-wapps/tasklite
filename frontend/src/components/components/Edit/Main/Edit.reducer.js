// modules
import * as R from 'ramda'
import jMoment from "moment-jalaali"
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  INSERT_TASK,
  CHANGE_EDIT_TITLE,
  CHANGE_EDIT_DEADLINE,
  CHANGE_EDIT_ASSIGNEE,
  CHANGE_EDIT_PRIORITY,
  CHANGE_TITLE_IS_ERROR,
  CHANGE_IS_OPEN_DIALOG,
} from './Edit.action'

// state
const initialState = {
  task: {},
  title: '',
  deadline: jMoment(),
  assignee: '',
  priority: '',
  isError: { title: false },
  anchorEl: null,
  popoverId: '',
  isOpenDialog: false,
}

// views
export const taskView = () => R.path(['Edit', 'task'])(getState())
export const titleView = () => R.path(['Edit', 'title'])(getState())
export const deadlineView = () => R.path(['Edit', 'deadline'])(getState())
export const assigneeView = () => R.path(['Edit', 'assignee'])(getState())
export const priorityView = () => R.path(['Edit', 'priority'])(getState())
export const isErrorView = () => R.path(['Edit', 'isError'])(getState())
export const anchorElView = () => R.path(['Edit', 'anchorEl'])(getState())
export const popoverIdView = () => R.path(['Edit', 'popoverId'])(getState())
export const isOpenDialogView = () =>
  R.path(['Edit', 'isOpenDialog'])(getState())

// reducers
const reducers = {
  [INSERT_TASK]: (state, task) => ({
    ...state,
    task,
    title: R.prop('title', task),
    assignee: R.prop('assignee', task),
    tags: R.prop('tags', task),
    priority: R.prop('priority', task),
    deadline: jMoment(R.prop('deadline', task)),
  }),

  [CHANGE_EDIT_TITLE]: (state, title) => ({
    ...state,
    title,
  }),

  [CHANGE_EDIT_DEADLINE]: (state, deadline) => ({
    ...state,
    deadline,
  }),

  [CHANGE_EDIT_ASSIGNEE]: (state, assignee) => ({
    ...state,
    assignee,
  }),

  [CHANGE_EDIT_PRIORITY]: (state, priority) => ({
    ...state,
    priority,
  }),

  [CHANGE_TITLE_IS_ERROR]: (state, value) => ({
    ...state,
    isError: {
      ...state.isError,
      title: value,
    },
  }),

  [CHANGE_IS_OPEN_DIALOG]: (state, value) => ({
    ...state,
    isOpenDialog: value,
  }),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
