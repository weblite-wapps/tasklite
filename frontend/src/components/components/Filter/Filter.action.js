// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const SET_API = 'SET_API'
export const setAPI = createAction(SET_API, (creator, user) => ({ creator, user }))
export const dispatchSetApi = (...args) => dispatch(setAPI(...args))

export const RESET_STAFF_LOGS = 'RESET_STAFF_LOGS'
export const resetStaffLogs = createAction(RESET_STAFF_LOGS, userId => ({ userId }))
export const dispatchResetStaffLogs = (...args) => dispatch(resetStaffLogs(...args))

export const LOAD_STAFF_LOGS = 'LOAD_STAFF_LOGS'
export const loadStaffLogs = createAction(LOAD_STAFF_LOGS, logs => ({ logs }))
export const dispatchLoadStaffLogs = (...args) => dispatch(loadStaffLogs(...args))

export const LOAD_TAGS_DATA_IN_REPORT = 'LOAD_TAGS_DATA_IN_REPORT'
export const loadTagsDataInReport = createAction(LOAD_TAGS_DATA_IN_REPORT, tags => ({ tags }))
export const dispatchLoadTagsDataInReport = (...args) => dispatch(loadTagsDataInReport(...args))

export const SET_QUERY = 'SET_QUERY'
export const setQuery = createAction(SET_QUERY, queryTag => ({ queryTag }))
export const dispatchSetQuery = (...args) => dispatch(setQuery(...args))

export const FETCH_TAGS = 'FETCH_TAGS'
export const fetchTags = createAction(FETCH_TAGS, tags => ({ tags }))
export const dispatchFetchTags = (...args) => dispatch(fetchTags(...args))

export const ADD_TAG = 'ADD_TAG'
export const addTag = createAction(ADD_TAG)
export const dispatchAddTag = (...args) => dispatch(addTag(...args))

export const CHANGE_SELECTED_TAGS = 'CHANGE_SELECTED_TAGS'
export const changeSelectedTags = createAction(CHANGE_SELECTED_TAGS, tag => ({ tag }))
export const dispatchChangeSelectedTags = (...args) => dispatch(changeSelectedTags(...args))

export const CALCULATE_TOTAL_DURATION = 'CALCULATE_TOTAL_DURATION'
export const calculateTotalDuration = createAction(CALCULATE_TOTAL_DURATION)
export const dispatchCalculateTotalDuration = (...args) => dispatch(calculateTotalDuration(...args))

export const RESTORE_TOTAL_DUARTION = 'RESTORE_TOTAL_DUARTION'
export const restoreTotalDuration = createAction(
  RESTORE_TOTAL_DUARTION,
  totalDuration => ({ totalDuration }),
)
export const dispatchRestoreTotalDuration = (...args) => dispatch(restoreTotalDuration(...args))

export const CHANGE_SELECTED_USER = 'CHANGE_SELECTED_USER'
export const changeSelectedUser = createAction(CHANGE_SELECTED_USER, value => ({ value }))
export const dispatchChangeSelectedUser = (...args) => dispatch(changeSelectedUser(...args))

export const CHANGE_ASSIGNEE = 'CHANGE_ASSIGNEE'
export const changeAssignee = createAction(CHANGE_ASSIGNEE, value => ({ value }))
export const dispatchChangeAssignee = (...args) => dispatch(changeAssignee(...args))
