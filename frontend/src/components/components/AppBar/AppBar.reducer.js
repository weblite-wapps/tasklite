// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import { CHANGE_EXPAND_MODE, SET_ABOUT_MODE } from './AppBar.action'

// state
const initialState = {
  aboutMode: false,
  expandMode: 'default',
}

// lens
const expandModeLens = R.lensProp('expandMode')
const aboutModeLens = R.lensProp('aboutMode')
// views
export const expandModeView = () => R.path(['AppBar', 'expandMode'])(getState())
export const aboutModeView = () => R.path(['AppBar', 'aboutMode'])(getState())


// reducers
const reducers = {
  [CHANGE_EXPAND_MODE]: (state, { newMode }) => R.set(expandModeLens, newMode, state),

  [SET_ABOUT_MODE]: (state, { value }) => R.set(aboutModeLens, value, state),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
