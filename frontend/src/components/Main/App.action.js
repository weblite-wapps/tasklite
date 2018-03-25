// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../setup/redux'

// actions
export const CHECK_TO_SET_SECONDS_ELAPSED = 'CHECK_TO_SET_SECONDS_ELAPSED'
export const checkToSetSecondsElapsed = createAction(CHECK_TO_SET_SECONDS_ELAPSED)
export const dispatchCheckToSetSecondsElapsed = (...args) =>
  dispatch(checkToSetSecondsElapsed(...args))

export const SET_API = 'SET_API'
export const setAPI = createAction(SET_API, (creator, user) => ({ creator, user }))
export const dispatchSetApi = (...args) => dispatch(setAPI(...args))

export const FETCH_TODAY_DATA = 'FETCH_TODAY_DATA'
export const fetchTodayData = createAction(FETCH_TODAY_DATA)
export const dispatchFetchTodayData = (...args) => dispatch(fetchTodayData(...args))

export const SET_ISLOADING = 'SET_ISLOADING'
export const setIsLoading = createAction(SET_ISLOADING, value => ({ value }))
export const dispatchSetIsLoading = (...args) => dispatch(setIsLoading(...args))

export const CHANGE_TAB = 'CHANGE_TAB'
export const changeTab = createAction(CHANGE_TAB, value => ({ value }))
export const dispatchChangeTab = (...args) => dispatch(changeTab(...args))

export const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
export const loadUsersData = createAction(LOAD_USERS_DATA, users => ({ users }))
export const dispatchLoadUsersData = (...args) => dispatch(loadUsersData(...args))

export const FETCH_ADMIN_DATA = 'FETCH_ADMIN_DATA'
export const fetchAdminData = createAction(FETCH_ADMIN_DATA)
export const dispatchFetchAdminData = (...args) => dispatch(fetchAdminData(...args))

export const LOAD_TASKS_DATA = 'LOAD_TASKS_DATA'
export const loadTasksData = createAction(LOAD_TASKS_DATA, tasks => ({ tasks }))
export const dispatchLoadTasksData = (...args) => dispatch(loadTasksData(...args))

export const CHANGE_POPOVER_ID = 'CHANGE_POPOVER_ID'
export const changePopoverId = createAction(CHANGE_POPOVER_ID, value => ({ value }))
export const dispatchChangePopoverId = (...args) => dispatch(changePopoverId(...args))

export const ADD_TASK = 'ADD_TASK'
export const addTask = createAction(ADD_TASK,
  (title, assignee, tags, priority, deadline) => ({ title, assignee, tags, priority, deadline }))
export const dispatchAddTask = (...args) => dispatch(addTask(...args))

export const RESTORE_TASK = 'RESTORE_TASK'
export const restoreTask = createAction(RESTORE_TASK, task => ({ task }))
export const dispatchRestoreTask = (...args) => dispatch(restoreTask(...args))

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = createAction(DELETE_TASK, _id => ({ _id }))
export const dispatchDeleteTask = (...args) => dispatch(deleteTask(...args))

export const CHANGE_EXPANDING_ID = 'CHANGE_EXPANDING_ID'
export const changeExpandingId = createAction(CHANGE_EXPANDING_ID, _id => ({ _id }))
export const dispatchChangeExpnadingId = (...args) => dispatch(changeExpandingId(...args))

export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const changeLevel = createAction(CHANGE_LEVEL, (_id, nextLevel) => ({ _id, nextLevel }))
export const dispatchChangeLevel = (...args) => dispatch(changeLevel(...args))

export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const changeTodoText = createAction(CHANGE_TODO_TEXT, (_id, value) => ({ _id, value }))
export const dispatchChangeTodoText = (...args) => dispatch(changeTodoText(...args))

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = createAction(TOGGLE_TODO, (_id, id) => ({ _id, id }))
export const dispatchToggleTodo = (...args) => dispatch(toggleTodo(...args))

export const ADD_TODO = 'ADD_TODO'
export const addTodo = createAction(ADD_TODO, (_id, value) => ({ _id, value }))
export const dispatchAddTodo = (...args) => dispatch(addTodo(...args))

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = createAction(DELETE_TODO, (_id, id) => ({ _id, id }))
export const dispatchDeleteTodo = (...args) => dispatch(deleteTodo(...args))

export const SET_SENT_TIME = 'SET_SENT_TIME'
export const setSentTime = createAction(SET_SENT_TIME, (_id, time) => ({ _id, time }))
export const dispatchSetSentTime = (...args) => dispatch(setSentTime(...args))

export const CHANGE_EXPAND_MODE = 'CHANGE_EXPAND_MODE'
export const changeExpandMode = createAction(CHANGE_EXPAND_MODE, newMode => ({ newMode }))
export const dispatchChangeExpandMode = (...args) => dispatch(changeExpandMode(...args))
