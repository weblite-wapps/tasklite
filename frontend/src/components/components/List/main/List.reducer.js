// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../../setup/redux'
// actions
import {
  CHANGE_POPOVER_ID,
  CHANGE_EXPANDING_ID,
  CLOSE_ALL_EXPANDINGS,
} from './List.action'

// state
const initialState = {
  popoverId: '',
  expandingId: '',
}

// lens
const popoverIdLens = R.lensProp('popoverId')
const expandingIdLens = R.lensProp('expandingId')
// views
export const popoverIdView = () => R.path(['List', 'popoverId'])(getState())
export const expandingIdView = () => R.path(['List', 'expandingId'])(getState())

// reducers
const reducers = {
  [CHANGE_POPOVER_ID]: (state, value) => R.set(popoverIdLens, value, state),

  [CHANGE_EXPANDING_ID]: (state, _id) => ({
    ...state,
    expandingId: state.expandingId === _id ? '' : _id,
  }),
  [CLOSE_ALL_EXPANDINGS]: (state, data) => R.set(expandingIdLens, '', state),
}

export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
