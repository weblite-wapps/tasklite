// modules
import * as R from 'ramda'
// local modules
import { getState } from '../../../setup/redux'
// actions
import {
  CHANGE_SORT_BY_DEADLINE,
  CHANGE_SORT_BY_PRIORITY,
} from './Sort.action'

// state
const initialState = {
  sortByDeadline: 'descending',
  sortByPriority: 'descending',
}

// lens
const sortByDeadlineLens = R.lensProp('sortByDeadline')
const sortByPriorityLens = R.lensProp('sortByPriority')
// views
export const sortByDeadlineView = () => R.path(['Sort', 'sortByDeadline'])(getState())
export const sortByPriorityView = () => R.path(['Sort', 'sortByPriority'])(getState())

// reducers
const reducers = {
  [CHANGE_SORT_BY_DEADLINE]: (state, { value }) => R.set(sortByDeadlineLens, value)(state),

  [CHANGE_SORT_BY_PRIORITY]: (state, { value }) => R.set(sortByPriorityLens, value)(state),
}


export default (state = initialState, { type, payload }) =>
  reducers[type] ? reducers[type](state, payload) : state
