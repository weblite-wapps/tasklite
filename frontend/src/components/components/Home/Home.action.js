// modules
import { createAction } from 'redux-actions'
import { dispatch } from '../../../setup/redux'

// actions
export const SET_API = 'SET_API'
export const setAPI = createAction(SET_API, (creator, user) => ({
  creator,
  user,
}))
export const dispatchSetApi = (...args) => dispatch(setAPI(...args))

export const FETCH_INITIAL_DATA = 'FETCH_INITIAL_DATA'
export const fetchInitialData = createAction(FETCH_INITIAL_DATA)
export const dispatchFetchInitialData = (...args) =>
  dispatch(fetchInitialData(...args))

export const SET_ISLOADING = 'SET_ISLOADING'
export const setIsLoading = createAction(SET_ISLOADING)
export const dispatchSetIsLoading = (...args) => dispatch(setIsLoading(...args))

export const CHANGE_TAB = 'CHANGE_TAB'
export const changeTab = createAction(CHANGE_TAB)
export const dispatchChangeTab = (...args) => dispatch(changeTab(...args))

export const LOAD_USERS_DATA = 'LOAD_USERS_DATA'
export const loadUsersData = createAction(LOAD_USERS_DATA)
export const dispatchLoadUsersData = (...args) =>
  dispatch(loadUsersData(...args))

export const LOAD_TASKS_DATA = 'LOAD_TASKS_DATA'
export const loadTasksData = createAction(LOAD_TASKS_DATA)
export const dispatchLoadTasksData = (...args) =>
  dispatch(loadTasksData(...args))

export const ADD_TASK = 'ADD_TASK'
export const addTask = createAction(ADD_TASK)
export const dispatchAddTask = (...args) => dispatch(addTask(...args))

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = createAction(DELETE_TASK, task => ({
  task,
}))
export const dispatchDeleteTask = (...args) => dispatch(deleteTask(...args))

export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const changeTodoText = createAction(CHANGE_TODO_TEXT, (_id, value) => ({
  _id,
  value,
}))
export const dispatchChangeTodoText = (...args) =>
  dispatch(changeTodoText(...args))

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = createAction(TOGGLE_TODO)
export const dispatchToggleTodo = (...args) => dispatch(toggleTodo(...args))

export const ADD_TODO = 'ADD_TODO'
export const addTodo = createAction(ADD_TODO)
export const dispatchAddTodo = (...args) => dispatch(addTodo(...args))

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = createAction(DELETE_TODO)
export const dispatchDeleteTodo = (...args) => dispatch(deleteTodo(...args))

export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const changeLevel = createAction(CHANGE_LEVEL)
export const dispatchChangeLevel = (...args) => dispatch(changeLevel(...args))

export const SET_SENT_TIME = 'SET_SENT_TIME'
export const setSentTime = createAction(SET_SENT_TIME, (_id, time) => ({
  _id,
  time,
}))
export const dispatchSetSentTime = (...args) => dispatch(setSentTime(...args))

export const LOAD_NUMBER_OF_TASKS = 'LOAD_NUMBER_OF_TASKS'
export const loadNumberOfTasks = createAction(LOAD_NUMBER_OF_TASKS)
export const dispatchLoadNumberOfTasks = (...args) =>
  dispatch(loadNumberOfTasks(...args))

export const UPDATE_NUMBERS_OBJECT = 'UPDATE_NUMBERS_OBJECT'
export const updateNumbersObject = createAction(
  UPDATE_NUMBERS_OBJECT,
  (currentLevel, nextLevel) => ({
    currentLevel,
    nextLevel,
  }),
)
export const dispatchUpdateNumbersObject = (...args) =>
  dispatch(updateNumbersObject(...args))

export const SET_EDITED_TASK = 'SET_EDITED_TASK'
export const setEditedTask = createAction(SET_EDITED_TASK)
export const dispatchSetEditedTask = (...args) =>
  dispatch(setEditedTask(...args))

export const SET_ALL_TASKS = 'SET_ALL_TASKS'
export const setAllTasks = createAction(SET_ALL_TASKS)
export const dispatchSetAllTasks = (...args) => dispatch(setAllTasks(...args))

export const SET_ORDER = 'SET_ORDER'
export const setOrder = createAction(SET_ORDER)
export const dispatchSetOrder = (...args) => dispatch(setOrder(...args))

// effects
export const LOAD_USERS = 'LOAD_USERS'
export const loadUsers= createAction(LOAD_USERS)
export const dispatchLoadUsers= (...args) => dispatch(loadUsers(...args))


export const HANDLE_CHANGE_LEVEL = 'HANDLE_CHANGE_LEVEL'
export const handleChangeLevel = createAction(
  HANDLE_CHANGE_LEVEL,
  (_id, currentLevel, nextLevel, title) => ({
    _id,
    currentLevel,
    nextLevel,
    title,
  }),
)
export const dispatchHandleChangeLevel = (...args) => dispatch(handleChangeLevel(...args))

export const HANDLE_ADD_TODO = 'HANDLE_ADD_TODO'
export const handleAddTodo = createAction(HANDLE_ADD_TODO, (_id, value) => ({
  _id,
  value,
}))
export const dispatchHandleAddTodo = (...args) =>
  dispatch(handleAddTodo(...args))

export const HANDLE_TOGGLE_TODO = 'HANDLE_TOGGLE_TODO'
export const handleToggleTodo = createAction(HANDLE_TOGGLE_TODO)
export const dispatchHandleToggleTodo = (...args) => dispatch(handleToggleTodo(...args))

export const HANDLE_DELETE_TASK = 'HANDLE_DELETE_TASK'
export const handleDeleteTask = createAction(HANDLE_DELETE_TASK, task => ({
  task,
}))
export const dispatchHandleDeleteTask = (...args) => dispatch(handleDeleteTask(...args))

export const HANDLE_DELETE_TODO = 'HANDLE_DELETE_TODO'
export const handleDeleteTodo = createAction(HANDLE_DELETE_TODO)
export const dispatchHandleDeleteTodo = (...args) => dispatch(handleDeleteTodo(...args))

export const HANDLE_DRAG_TASK = 'HANDLE_DRAG_TASK'
export const handleDragTask = createAction(HANDLE_DRAG_TASK)
export const dispatchHandleDragTask = (...args) =>
  dispatch(handleDragTask(...args))

// Real time
export const HANDLE_REAL_TIME = 'HANDLE_REAL_TIME'
export const handleRealTime = createAction(HANDLE_REAL_TIME)
export const dispatchHandleRealTime = (...args) =>
  dispatch(handleRealTime(...args))

export const DRAG_TASK = 'DRAG_TASK'
export const dragTask = createAction(DRAG_TASK)
export const dispatchDragTask = (...args) => dispatch(dragTask(...args))

export const DRAG_TODO = 'DRAG_TODO'
export const dragTodo = createAction(DRAG_TODO)
export const dispatchDragTodo = (...args) => dispatch(dragTodo(...args))