import {
  HANDLE_DRAG_TASK,
  ADD_TASK,
  DELETE_TASK,
  ADD_TODO,
  DELETE_TODO,
  CHANGE_LEVEL,
  dispatchFetchAllTasks,
  dispatchFetchSingleTask,
  dispatchFetchNoting,
  TOGGLE_TODO,
  LOAD_USERS,
} from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(({ type, data }) =>
  type === HANDLE_DRAG_TASK
    ? dispatchFetchAllTasks()
    : type === DELETE_TASK || type === DELETE_TODO || type === ADD_TASK || type === ADD_TODO || type === CHANGE_LEVEL || type === TOGGLE_TODO || type === LOAD_USERS
    ? dispatchFetchNoting({ type, data })
    : dispatchFetchSingleTask({ type, data })
)

export const pulse = (type, data) => {
  W && W.share.dispatch([], ['__always', [{ type, data }]], {})
}
