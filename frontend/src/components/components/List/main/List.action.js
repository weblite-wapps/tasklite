// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'

// actions
export const LOAD_MORE = 'LOAD_MORE'
export const loadMore = createAction(LOAD_MORE,
  (skipLength, tabIndex) => ({ skipLength, tabIndex }))
export const dispatchLoadMore = (...args) => dispatch(loadMore(...args))

export const CHANGE_POPOVER_ID = 'CHANGE_POPOVER_ID'
export const changePopoverId = createAction(CHANGE_POPOVER_ID, value => ({ value }))
export const dispatchChangePopoverId = (...args) => dispatch(changePopoverId(...args))

export const CHANGE_EXPANDING_ID = 'CHANGE_EXPANDING_ID'
export const changeExpandingId = createAction(CHANGE_EXPANDING_ID, _id => ({ _id }))
export const dispatchChangeExpnadingId = (...args) => dispatch(changeExpandingId(...args))