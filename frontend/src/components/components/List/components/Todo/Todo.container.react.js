// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import { dispatchToggleTodo, dispatchDeleteTodo } from '../../../../Main/App.action'


const mapDispatchToProps = (_, { _id, todo }) => ({
  onCompletedChange: () => dispatchToggleTodo(_id, todo._id),
  onDelete: () => dispatchDeleteTodo(_id, todo._id),
})

export default connect(null, mapDispatchToProps)(Todo)
