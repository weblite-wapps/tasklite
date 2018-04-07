// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import { tabIndexView, creatorView } from '../../../Main/App.reducer'
import { expandingIdView, popoverIdView } from './List.reducer'
// actions
import { dispatchChangeTodoText, dispatchAddTodo, dispatchDeleteTask } from '../../../Main/App.action'
import { dispatchChangeExpnadingId, dispatchChangePopoverId } from './List.action'


const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
  expandingId: expandingIdView(),
  popoverId: popoverIdView(),
  creator: creatorView(),
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
