// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'


// actions
export const CHANGE_DEADLINE = 'CHANGE_DEADLINE'
export const changeDeadline = createAction(CHANGE_DEADLINE, value => ({ value }))
export const dispatchChangeDeadline = (...args) => dispatch(changeDeadline(...args))

export const CHANGE_START_TIME = 'CHANGE_START_TIME'
export const changeStartTime = createAction(CHANGE_START_TIME, value => ({ value }))
export const dispatchChangeStartTime = (...args) => dispatch(changeStartTime(...args))

export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const changeEndTime = createAction(CHANGE_END_TIME, value => ({ value }))
export const dispatchChangeEndTime = (...args) => dispatch(changeEndTime(...args))

export const SET_QUERY_TAG_IN_ADD = 'SET_QUERY_TAG_IN_ADD'
export const setQueryTagInAdd = createAction(SET_QUERY_TAG_IN_ADD, queryTag => ({ queryTag }))
export const dispatchSetQueryTagInAdd = (...args) => dispatch(setQueryTagInAdd(...args))

export const FETCH_TAGS_IN_ADD = 'FETCH_TAGS_IN_ADD'
export const fetchTagsInAdd = createAction(FETCH_TAGS_IN_ADD, tags => ({ tags }))
export const dispatchFetchTagsInAdd = (...args) => dispatch(fetchTagsInAdd(...args))

export const LOAD_TAGS_DATA_IN_ADD = 'LOAD_TAGS_DATA_IN_ADD'
export const loadTagsDataInAdd = createAction(LOAD_TAGS_DATA_IN_ADD, tags => ({ tags }))
export const dispatchLoadTagsDataInAdd = (...args) => dispatch(loadTagsDataInAdd(...args))

export const LOAD_USERS_DATA_IN_ADD = 'LOAD_USERS_DATA_IN_ADD'
export const loadUsersDataInAdd = createAction(LOAD_USERS_DATA_IN_ADD, users => ({ users }))
export const dispatchLoadUsersDataInAdd = (...args) => dispatch(loadUsersDataInAdd(...args))

export const CHANGE_TITLE = 'CHANGE_TITLE'
export const changeTitle = createAction(CHANGE_TITLE, value => ({ value }))
export const dispatchChangeTitle = (...args) => dispatch(changeTitle(...args))

export const CHANGE_PRIORITY = 'CHANGE_PRIORITY'
export const changePriority = createAction(CHANGE_PRIORITY, value => ({ value }))
export const dispatchChangePriority = (...args) => dispatch(changePriority(...args))

export const ADD_TAG_IN_ADD = 'ADD_TAG_IN_ADD'
export const addTagInAdd = createAction(ADD_TAG_IN_ADD)
export const dispatchAddTagInAdd = (...args) => dispatch(addTagInAdd(...args))

export const CHANGE_SELECTED_TAGS_IN_ADD = 'CHANGE_SELECTED_TAGS_IN_ADD'
export const changeSelectedTagsInAdd = createAction(CHANGE_SELECTED_TAGS_IN_ADD, tag => ({ tag }))
export const dispatchChangeSelectedTagsInAdd = (...args) =>
  dispatch(changeSelectedTagsInAdd(...args))

export const CHANGE_ASSIGNEE_IN_ADD = 'CHANGE_ASSIGNEE_IN_ADD'
export const changeAssigneeInAdd = createAction(CHANGE_ASSIGNEE_IN_ADD, user => ({ user }))
export const dispatchChangeAssigneeInAdd = (...args) =>
  dispatch(changeAssigneeInAdd(...args))

export const RESET_INPUTS = 'RESET_INPUTS'
export const resetInputs = createAction(RESET_INPUTS)
export const dispatchResetInputs = (...args) => dispatch(resetInputs(...args))

export const CHANGE_IS_ERROR = 'CHANGE_IS_ERROR'
export const changeIsError = createAction(CHANGE_IS_ERROR, value => ({ value }))
export const dispatchChangeIsError = (...args) => dispatch(changeIsError(...args))


// effects
export const HANDLE_ADD_TAG = 'HANDLE_ADD_TAG'
export const handleAddTag = createAction(HANDLE_ADD_TAG)
export const dispatchHandleAddTag = (...args) => dispatch(handleAddTag(...args))

export const HANDLE_ADD_TASK = 'HANDLE_ADD_TASK'
export const handleAddTask = createAction(HANDLE_ADD_TASK,
  (title, assignee, selectedTags, priority, deadline) =>
    ({ title, assignee, selectedTags, priority, deadline }))
export const dispatchHandleAddTask = (...args) => dispatch(handleAddTask(...args))
