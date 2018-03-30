// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const LOAD_TAGS_DATA_IN_FILTER = 'LOAD_TAGS_DATA_IN_FILTER'
export const loadTagsDataInFilter = createAction(LOAD_TAGS_DATA_IN_FILTER, tags => ({ tags }))
export const dispatchLoadTagsDataInFilter = (...args) => dispatch(loadTagsDataInFilter(...args))

export const SET_QUERY_TAG = 'SET_QUERY_TAG'
export const setQueryTag = createAction(SET_QUERY_TAG, queryTag => ({ queryTag }))
export const dispatchSetQueryTag = (...args) => dispatch(setQueryTag(...args))

export const FETCH_TAGS = 'FETCH_TAGS'
export const fetchTags = createAction(FETCH_TAGS, tags => ({ tags }))
export const dispatchFetchTags = (...args) => dispatch(fetchTags(...args))

export const ADD_TAG = 'ADD_TAG'
export const addTag = createAction(ADD_TAG)
export const dispatchAddTag = (...args) => dispatch(addTag(...args))

export const CHANGE_SELECTED_TAGS = 'CHANGE_SELECTED_TAGS'
export const changeSelectedTags = createAction(CHANGE_SELECTED_TAGS, tag => ({ tag }))
export const dispatchChangeSelectedTags = (...args) => dispatch(changeSelectedTags(...args))
