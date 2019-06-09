import {
  HANDLE_DRAG_TASK,
  FETCH_ALL_USERS,
  ADD_TASK,
  DELETE_TASK,
  ADD_TODO,
  DELETE_TODO,
  dispatchFetchAllTasks,
  dispatchFetchAllUsers,
  dispatchFetchSingleTask,
  dispatchFetchNoting,
} from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(({ type, data }) =>
  type === HANDLE_DRAG_TASK
    ? dispatchFetchAllTasks()
    : type === FETCH_ALL_USERS
    ? dispatchFetchAllUsers()
    : type === DELETE_TASK || type === DELETE_TODO || type === ADD_TASK || type === ADD_TODO
    ? dispatchFetchNoting({ type, data })
    : dispatchFetchSingleTask({ type, data })
)

export const pulse = (type, data) => {
  W && W.share.dispatch([], ['__always', [{ type, data }]], {})
}
