// modules
import {
  createAction
} from 'redux-actions'
import {
  dispatch
} from '../../../setup/redux'

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

// export const ADD_TASK = 'ADD_TASK'
// export const addTask = createAction(
//   ADD_TASK,
//   (title, selectedUser, tags, priority, deadline, indexInDb) => ({
//     title,
//     selectedUser,
//     tags,
//     priority,
//     deadline,
//     indexInDb,
//   }),
// )
// export const dispatchAddTask = (...args) => dispatch(addTask(...args))

export const ADD_TASK = 'ADD_TASK'
export const addTask = createAction(ADD_TASK)
export const dispatchAddTask = (...args) => dispatch(addTask(...args))

export const DELETE_TASK = 'DELETE_TASK'
export const deleteTask = createAction(DELETE_TASK, task => ({
  task
}))
export const dispatchDeleteTask = (...args) => dispatch(deleteTask(...args))

export const CHANGE_LEVEL = 'CHANGE_LEVEL'
export const changeLevel = createAction(
  CHANGE_LEVEL,
  (_id, currentLevel, nextLevel, title) => ({
    _id,
    currentLevel,
    nextLevel,
    title,
  }),
)
export const dispatchChangeLevel = (...args) => dispatch(changeLevel(...args))

export const CHANGE_TODO_TEXT = 'CHANGE_TODO_TEXT'
export const changeTodoText = createAction(CHANGE_TODO_TEXT, (_id, value) => ({
  _id,
  value,
}))
export const dispatchChangeTodoText = (...args) =>
  dispatch(changeTodoText(...args))

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = createAction(TOGGLE_TODO, (_id, todoId) => ({
  _id,
  todoId,
}))
export const dispatchToggleTodo = (...args) => dispatch(toggleTodo(...args))

export const ADD_TODO = 'ADD_TODO'
export const addTodo = createAction(ADD_TODO, (_id, value) => ({
  _id,
  value
}))
export const dispatchAddTodo = (...args) => dispatch(addTodo(...args))

export const RESTORE_TODO = 'RESTORE_TODO'
export const restoreTodo = createAction(RESTORE_TODO)
export const dispatchRestoreTodo = (...args) => dispatch(restoreTodo(...args))

export const DELETE_TODO = 'DELETE_TODO'
export const deleteTodo = createAction(DELETE_TODO, (_id, todoId) => ({
  _id,
  todoId,
}))
export const dispatchDeleteTodo = (...args) => dispatch(deleteTodo(...args))

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
    nextLevel
  }),
)
export const dispatchUpdateNumbersObject = (...args) =>
  dispatch(updateNumbersObject(...args))

export const SET_EDITED_TASK = 'SET_EDITED_TASK'
export const setEditedTask = createAction(SET_EDITED_TASK)
export const dispatchSetEditedTask = (...args) => dispatch(setEditedTask(...args))

export const SET_ALL_TASKS = 'SET_ALL_TASKS'
export const setAllTasks = createAction(SET_ALL_TASKS)
export const dispatchSetAllTasks = (...args) => dispatch(setAllTasks(...args))

export const HANDLE_DRAG_TASK = 'HANDLE_DRAG_TASK'
export const handleDragTask = createAction(HANDLE_DRAG_TASK)
export const dispatchHandleDragTask = (...args) =>
  dispatch(handleDragTask(...args))

export const SET_INDEXINDB = 'SET_INDEXINDB'
export const setIndexInDb = createAction(SET_INDEXINDB)
export const dispatchSetIndexInDb = (...args) => dispatch(setIndexInDb(...args))