// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

// actions
export const CHANGE_EXPAND_MODE = 'CHANGE_EXPAND_MODE'
export const changeExpandMode = createAction(CHANGE_EXPAND_MODE)
export const dispatchChangeExpandMode = (...args) => dispatch(changeExpandMode(...args))

export const SET_ABOUT_MODE = 'SET_ABOUT_MODE'
export const setAboutMode = createAction(SET_ABOUT_MODE)
export const dispatchSetAboutMode = (...args) => dispatch(setAboutMode(...args))