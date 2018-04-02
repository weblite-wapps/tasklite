// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const CHANGE_SORT_BY_DEADLINE = 'CHANGE_SORT_BY_DEADLINE'
export const changeSortByDeadline = createAction(CHANGE_SORT_BY_DEADLINE, value => ({ value }))
export const dispatchChangeSortByDeadline = (...args) => dispatch(changeSortByDeadline(...args))

export const CHANGE_SORT_BY_PRIORITY = 'CHANGE_SORT_BY_PRIORITY'
export const changeSortByPriority = createAction(CHANGE_SORT_BY_PRIORITY, value => ({ value }))
export const dispatchChangeSortByPriority = (...args) => dispatch(changeSortByPriority(...args))
