// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import {
  tabIndexView,
  creatorView,
  isLoadingView,
} from '../../Home/Home.reducer'
import { expandingIdView, popoverIdView } from './List.reducer'
// actions
import {
  dispatchChangeTodoText,
  dispatchHandleAddTodo,
  dispatchDeleteTask,
} from '../../Home/Home.action'
import {
  dispatchChangeExpandingId,
  dispatchChangePopoverId,
  dispatchEditButtonClick,
  dispatchHandleDragTodo,
} from './List.action'

const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
  expandingId: expandingIdView(),
  popoverId: popoverIdView(),
  creator: creatorView(),
  isLoading: isLoadingView(),
})

const mapDispatchToProps = (_, { task }) => ({
  onExpandClick: dispatchChangeExpandingId,
  onTodoTextChange: value => dispatchChangeTodoText(task._id, value),
  changePopoverId: dispatchChangePopoverId,
  deleteTask: () => dispatchDeleteTask(task),
  editTask: () => dispatchEditButtonClick(task),
  addTodo: value => {
    dispatchHandleAddTodo(task._id, value)
    dispatchChangeTodoText(task._id, '')
  },
  onDragEnd: dispatchHandleDragTodo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List)
