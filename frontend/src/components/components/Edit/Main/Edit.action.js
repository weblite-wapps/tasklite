// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'

// actions
export const INSERT_TASK = 'INSERT_TASK'
export const insertTask = createAction(INSERT_TASK)
export const dispatchInsertTask = (...args) => dispatch(insertTask(...args))

export const SUBMIT_EDIT = 'SUBMIT_EDIT'
export const submitEdit = createAction(SUBMIT_EDIT)
export const dispatchSubmitEdit = (...args) => dispatch(submitEdit(...args))

export const CHANGE_EDIT_TITLE = 'CHANGE_EDIT_TITLE'
export const changeEditTitle = createAction(CHANGE_EDIT_TITLE)
export const dispatchChangeEditTitle = (...args) =>
  dispatch(changeEditTitle(...args))
 
export const CHANGE_EDIT_DEADLINE = 'CHANGE_EDIT_DEADLINE'
export const changeEditDeadline = createAction(CHANGE_EDIT_DEADLINE)
export const dispatchChangeEditDeadline = (...args) =>
  dispatch(changeEditDeadline(...args))

export const CHANGE_EDIT_ASSIGNEE = 'CHANGE_EDIT_ASSIGNEE'
export const changeEditAssignee = createAction(CHANGE_EDIT_ASSIGNEE)
export const dispatchChangeEditAssignee = (...args) =>
  dispatch(changeEditAssignee(...args))

export const CHANGE_EDIT_PRIORITY = 'CHANGE_EDIT_PRIORITY'
export const changeEditPriority = createAction(CHANGE_EDIT_PRIORITY)
export const dispatchChangeEditPriority = (...args) =>
  dispatch(changeEditPriority(...args))

export const CLOSE_EDIT = 'CLOSE_EDIT'
export const closeEdit = createAction(CLOSE_EDIT)
export const dispatchCloseEdit = (...args) => dispatch(closeEdit(...args))

export const CHANGE_TITLE_IS_ERROR = 'CHANGE_TITLE_IS_ERROR'
export const changeTitleIsError = createAction(CHANGE_TITLE_IS_ERROR)
export const dispatchChangeTitleIsError = (...args) =>
  dispatch(changeTitleIsError(...args))

export const CHANGE_EDIT_POPOVER_ID = 'CHANGE_EDIT_POPOVER_ID'
export const changeEditPopOverId = createAction(CHANGE_EDIT_POPOVER_ID)
export const dispatchChangeEditPopOverId = (...args) =>
  dispatch(changeEditPopOverId(...args))

export const CHANGE_EDIT_ANCHOR_EL = 'CHANGE_EDIT_ANCHOR_EL'
export const changeEditAnchorEl = createAction(CHANGE_EDIT_ANCHOR_EL)
export const dispatchChangeEditAnchorEl = (...args) =>
  dispatch(changeEditAnchorEl(...args))

export const CHANGE_IS_OPEN_DIALOG = 'CHANGE_IS_OPEN_DIALOG'
export const changeIsOpenDialog = createAction(CHANGE_IS_OPEN_DIALOG)
export const dispatchChangeIsOpenDialog = (...args) =>
  dispatch(changeIsOpenDialog(...args))
