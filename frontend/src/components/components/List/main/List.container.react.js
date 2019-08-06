// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import {
  tabIndexView,
  creatorView,
  isLoadingView,
  userView,
} from '../../Home/Home.reducer'
import { expandingIdView, popoverIdView } from './List.reducer'
// actions
import {
  dispatchChangeTodoText,
  dispatchHandleAddTodo,
  dispatchHandleDeleteTask,
} from '../../Home/Home.action'
import {
  dispatchChangeExpandingId,
  dispatchChangePopoverId,
  dispatchEditButtonClick,
  dispatchHandleDragTodo,
  dispatchCloseAllExpandings,
} from './List.action'

const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
  expandingId: expandingIdView(),
  popoverId: popoverIdView(),
  creator: creatorView(),
  user: userView(),
  isLoading: isLoadingView(),
})

const mapDispatchToProps = (_, { task }) => ({
  onExpandClick: dispatchChangeExpandingId,
  onTodoTextChange: value => dispatchChangeTodoText(task._id, value),
  changePopoverId: dispatchChangePopoverId,
  deleteTask: () => dispatchHandleDeleteTask(task),
  editTask: () => dispatchEditButtonClick(task),
  addTodo: value => {
    dispatchHandleAddTodo(task._id, value)
    dispatchChangeTodoText(task._id, '')
  },
  onDragEnd: dispatchHandleDragTodo,
  onDragStart: e => dispatchCloseAllExpandings(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
