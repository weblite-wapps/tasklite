// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import { CHANGE_EXPAND_MODE, SET_ABOUT_MODE, TOGGLE_SORT_BY_DEADLINE } from './AppBar.action'

// state
const initialState = {
  aboutMode: false,
  expandMode: 'default',
  sortByDeadline: false,
}

// lens
const expandModeLens = R.lensProp('expandMode')
const aboutModeLens = R.lensProp('aboutMode')
const sortByDeadlineLens = R.lensProp('sortByDeadline')
// views
export const expandModeView = () => R.path(['AppBar', 'expandMode'])(getState())
export const aboutModeView = () => R.path(['AppBar', 'aboutMode'])(getState())
export const sortByDeadlineView = () => R.path(['AppBar', 'sortByDeadline'])(getState())

// reducers
const reducers = {
  [CHANGE_EXPAND_MODE]: (state, { newMode }) => R.set(expandModeLens, newMode, state),

  [SET_ABOUT_MODE]: (state, { value }) => R.set(aboutModeLens, value, state),

  [TOGGLE_SORT_BY_DEADLINE]: state => R.set(sortByDeadlineLens, !state.sortByDeadline, state),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
