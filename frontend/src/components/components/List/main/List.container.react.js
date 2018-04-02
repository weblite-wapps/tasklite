// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import { expandingIdView, tabIndexView, popoverIdView } from '../../../Main/App.reducer'
// actions
import {
  dispatchChangeExpnadingId,
  dispatchChangeTodoText,
  dispatchAddTodo,
  dispatchDeleteTask,
  dispatchChangePopoverId,
} from '../../../Main/App.action'


const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
  expandingId: expandingIdView(),
  popoverId: popoverIdView(),
})

const mapDispatchToProps = (_, { task }) => ({
  onExpandClick: dispatchChangeExpnadingId,
  onTodoTextChange: value => dispatchChangeTodoText(task._id, value),
  changePopoverId: dispatchChangePopoverId,
  deleteTask: () => dispatchDeleteTask(task),
  addTodo: (value) => {
    dispatchAddTodo(task._id, value)
    dispatchChangeTodoText(task._id, '')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
