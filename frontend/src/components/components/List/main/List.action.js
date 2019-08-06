// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'

// actions
export const LOAD_MORE = 'LOAD_MORE'
export const loadMore = createAction(LOAD_MORE, (skipLength, tabIndex) => ({
  skipLength,
  tabIndex,
}))
export const dispatchLoadMore = (...args) => dispatch(loadMore(...args))

export const CHANGE_POPOVER_ID = 'CHANGE_POPOVER_ID'
export const changePopoverId = createAction(CHANGE_POPOVER_ID)
export const dispatchChangePopoverId = (...args) =>
  dispatch(changePopoverId(...args))

export const CHANGE_EXPANDING_ID = 'CHANGE_EXPANDING_ID'
export const changeExpandingId = createAction(CHANGE_EXPANDING_ID)
export const dispatchChangeExpandingId = (...args) =>
  dispatch(changeExpandingId(...args))

export const EDIT_BUTTON_CLICK = 'EDIT_BUTTON_CLICK'
export const editButtonClick = createAction(EDIT_BUTTON_CLICK)
export const dispatchEditButtonClick = (...args) =>
  dispatch(editButtonClick(...args))

export const HANDLE_DRAG_TODO = 'HANDLE_DRAG_TODO'
export const handleDragTodo = createAction(HANDLE_DRAG_TODO)
export const dispatchHandleDragTodo = (...args) =>
  dispatch(handleDragTodo(...args))

export const CLOSE_ALL_EXPANDINGS = 'CLOSE_ALL_EXPANDINGS'
export const closeAllExpandings = createAction(CLOSE_ALL_EXPANDINGS)
export const dispatchCloseAllExpandings = (...args) =>
  dispatch(closeAllExpandings(...args))
