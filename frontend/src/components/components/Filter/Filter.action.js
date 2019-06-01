// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const LOAD_TAGS_DATA_IN_FILTER = 'LOAD_TAGS_DATA_IN_FILTER'
export const loadTagsDataInFilter = createAction(LOAD_TAGS_DATA_IN_FILTER)
export const dispatchLoadTagsDataInFilter = (...args) => dispatch(loadTagsDataInFilter(...args))

export const SET_QUERY_TAG_IN_FILTER = 'SET_QUERY_TAG_IN_FILTER'
export const setQueryTagInFilter = createAction(SET_QUERY_TAG_IN_FILTER)
export const dispatchSetQueryTagInFilter = (...args) => dispatch(setQueryTagInFilter(...args))

export const FETCH_TAGS_IN_FILTER = 'FETCH_TAGS_IN_FILTER'
export const fetchTagsInFilter = createAction(FETCH_TAGS_IN_FILTER)
export const dispatchFetchTagsInFilter = (...args) => dispatch(fetchTagsInFilter(...args))

export const ADD_TAG_IN_FILTER = 'ADD_TAG_IN_FILTER'
export const addTagInFilter = createAction(ADD_TAG_IN_FILTER)
export const dispatchAddTagInFilter = (...args) => dispatch(addTagInFilter(...args))

export const CHANGE_SELECTED_TAGS_IN_FILTER = 'CHANGE_SELECTED_TAGS_IN_FILTER'
export const changeSelectedTagsInFilter = createAction(
  CHANGE_SELECTED_TAGS_IN_FILTER)
export const dispatchChangeSelectedTagsInFilter = (...args) =>
  dispatch(changeSelectedTagsInFilter(...args))

export const CHANGE_ASSIGNEE_IN_FILTER = 'CHANGE_ASSIGNEE_IN_FILTER'
export const changeAssigneeInFilter = createAction(
  CHANGE_ASSIGNEE_IN_FILTER)
export const dispatchChangeAssigneeInFilter = (...args) =>
  dispatch(changeAssigneeInFilter(...args))
