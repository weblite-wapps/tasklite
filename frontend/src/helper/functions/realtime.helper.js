import {
  HANDLE_DRAG_TASK,
  dispatchFetchAllTasks,
  FETCH_ALL_USERS,
  dispatchFetchAllUsers,
  dispatchFetchSingleTask,
} from '../../components/components/Home/Home.action'

const { W } = window

W && W.share.subscribe(data => console.log(data))
//   type === HANDLE_DRAG_TASK
//     ? dispatchFetchAllTasks()
//     : type === FETCH_ALL_USERS
//     ? dispatchFetchAllUsers()
//     : dispatchFetchSingleTask(type, data),
// )

export const pulse = (type, data) => {
  W && W.share.dispatch([], ['__always', [{ type, data }]], {})
}
