// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../../setup/redux'


// actions
export const SET_QUERY_TAG_IN_ADD = 'SET_QUERY_TAG_IN_ADD'
export const setQueryTagInAdd = createAction(SET_QUERY_TAG_IN_ADD, queryTag => ({ queryTag }))
export const dispatchSetQueryTagInAdd = (...args) => dispatch(setQueryTagInAdd(...args))

export const SET_QUERY_USER_IN_ADD = 'SET_QUERY_USER_IN_ADD'
export const setQueryUserInAdd = createAction(SET_QUERY_USER_IN_ADD, queryUser => ({ queryUser }))
export const dispatchSetQueryUserInAdd = (...args) => dispatch(setQueryUserInAdd(...args))

export const FETCH_TAGS_IN_ADD = 'FETCH_TAGS_IN_ADD'
export const fetchTagsInAdd = createAction(FETCH_TAGS_IN_ADD, tags => ({ tags }))
export const dispatchFetchTagsInAdd = (...args) => dispatch(fetchTagsInAdd(...args))

export const FETCH_USERS_IN_ADD = 'FETCH_USERS_IN_ADD'
export const fetchUsersInAdd = createAction(FETCH_USERS_IN_ADD, users => ({ users }))
export const dispatchFetchUsersInAdd = (...args) => dispatch(fetchUsersInAdd(...args))

export const CHANGE_DEADLINE = 'CHANGE_DEADLINE'
export const changeDeadline = createAction(CHANGE_DEADLINE, value => ({ value }))
export const dispatchChangeDeadline = (...args) => dispatch(changeDeadline(...args))

export const CHANGE_START_TIME = 'CHANGE_START_TIME'
export const changeStartTime = createAction(CHANGE_START_TIME, value => ({ value }))
export const dispatchChangeStartTime = (...args) => dispatch(changeStartTime(...args))

export const CHANGE_END_TIME = 'CHANGE_END_TIME'
export const changeEndTime = createAction(CHANGE_END_TIME, value => ({ value }))
export const dispatchChangeEndTime = (...args) => dispatch(changeEndTime(...args))

export const LOAD_TAGS_DATA_IN_ADD = 'LOAD_TAGS_DATA_IN_ADD'
export const loadTagsDataInAdd = createAction(LOAD_TAGS_DATA_IN_ADD, tags => ({ tags }))
export const dispatchLoadTagsDataInAdd = (...args) => dispatch(loadTagsDataInAdd(...args))

export const LOAD_USERS_DATA_IN_ADD = 'LOAD_USERS_DATA_IN_ADD'
export const loadUsersDataInAdd = createAction(LOAD_USERS_DATA_IN_ADD, users => ({ users }))
export const dispatchLoadUsersDataInAdd = (...args) => dispatch(loadUsersDataInAdd(...args))

export const CHANGE_TITLE = 'CHANGE_TITLE'
export const changeTitle = createAction(CHANGE_TITLE, value => ({ value }))
export const dispatchChangeTitle = (...args) => dispatch(changeTitle(...args))

export const CHANGE_ASSIGNEE = 'CHANGE_ASSIGNEE'
export const changeAssignee = createAction(CHANGE_ASSIGNEE, value => ({ value }))
export const dispatchChangeAssignee = (...args) => dispatch(changeAssignee(...args))

export const CHANGE_PRIORITY = 'CHANGE_PRIORITY'
export const changePriority = createAction(CHANGE_PRIORITY, value => ({ value }))
export const dispatchChangePriority = (...args) => dispatch(changePriority(...args))

export const ADD_TAG_IN_ADD = 'ADD_TAG_IN_ADD'
export const addTagInAdd = createAction(ADD_TAG_IN_ADD)
export const dispatchAddTagInAdd = (...args) => dispatch(addTagInAdd(...args))

export const ADD_USER_IN_ADD = 'ADD_USER_IN_ADD'
export const addUserInAdd = createAction(ADD_USER_IN_ADD)
export const dispatchAddUserInAdd = (...args) => dispatch(addUserInAdd(...args))

export const CHANGE_SELECTED_TAGS_IN_ADD = 'CHANGE_SELECTED_TAGS_IN_ADD'
export const changeSelectedTagsInAdd = createAction(CHANGE_SELECTED_TAGS_IN_ADD, tag => ({ tag }))
export const dispatchChangeSelectedTagsInAdd = (...args) =>
  dispatch(changeSelectedTagsInAdd(...args))

export const CHANGE_SELECTED_USERS_IN_ADD = 'CHANGE_SELECTED_USERS_IN_ADD'
export const changeSelectedUsersInAdd = createAction(CHANGE_SELECTED_USERS_IN_ADD, user => ({ user }))
export const dispatchChangeSelectedUsersInAdd = (...args) =>
  dispatch(changeSelectedUsersInAdd(...args))

export const RESET_INPUTS = 'RESET_INPUTS'
export const resetInputs = createAction(RESET_INPUTS)
export const dispatchResetInputs = (...args) => dispatch(resetInputs(...args))
