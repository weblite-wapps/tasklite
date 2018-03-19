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

const mapDispatchToProps = (_, { task: { _id } }) => ({
  onExpandClick: dispatchChangeExpnadingId,
  onTodoTextChange: value => dispatchChangeTodoText(_id, value),
  addTodo: (value) => {
    dispatchAddTodo(_id, value)
    dispatchChangeTodoText(_id, '')
  },
  changePopoverId: dispatchChangePopoverId,
  deleteTask: () => dispatchDeleteTask(_id),
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
