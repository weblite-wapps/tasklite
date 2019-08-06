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

export const CHANGE_IS_OPEN_DIALOG = 'CHANGE_IS_OPEN_DIALOG'
export const changeIsOpenDialog = createAction(CHANGE_IS_OPEN_DIALOG)
export const dispatchChangeIsOpenDialog = (...args) =>
  dispatch(changeIsOpenDialog(...args))

export const SET_TAG_QUERY_IN_EDIT = 'SET_TAG_QUERY_IN_EDIT'
export const setTagQueryInEdit = createAction(SET_TAG_QUERY_IN_EDIT)
export const dispatchSetTagQueryInEdit = (...args) =>
  dispatch(setTagQueryInEdit(...args))

export const CHANGE_SELECTED_TAGS_IN_EDIT = 'CHANGE_SELECTED_TAGS_IN_EDIT'
export const changeSelectedTagsInEdit = createAction(
  CHANGE_SELECTED_TAGS_IN_EDIT,
)
export const dispatchChangeSelectedTagsInEdit = (...args) =>
  dispatch(changeSelectedTagsInEdit(...args))

export const HANDLE_ADD_TAG_IN_EDIT = 'HANDLE_ADD_TAG_IN_EDIT'
export const handleAddTagInEdit = createAction(HANDLE_ADD_TAG_IN_EDIT)
export const dispatchHandleAddTagInEdit = (...args) =>
  dispatch(handleAddTagInEdit(...args))

export const LOAD_TAGS_DATA_IN_EDIT = 'LOAD_TAGS_DATA_IN_EDIT'
export const loadTagsDataInEdit = createAction(
  LOAD_TAGS_DATA_IN_EDIT,
  tags => ({ tags }),
)
export const dispatchLoadTagsDataInEdit = (...args) =>
  dispatch(loadTagsDataInEdit(...args))

export const UPDATE_TAGS_DATA_IN_EDIT = 'UPDATE_TAGS_DATA_IN_EDIT'
export const updateTagsDataInEdit = createAction(
  UPDATE_TAGS_DATA_IN_EDIT,
  tags => ({ tags }),
)
export const dispatchUpdateTagsDataInEdit = (...args) =>
  dispatch(updateTagsDataInEdit(...args))

export const FETCH_TAGS_IN_EDIT = 'FETCH_TAGS_IN_EDIT'
export const fetchTagsInEdit = createAction(FETCH_TAGS_IN_EDIT, tags => ({
  tags,
}))
export const dispatchFetchTagsInEdit = (...args) =>
  dispatch(fetchTagsInEdit(...args))
