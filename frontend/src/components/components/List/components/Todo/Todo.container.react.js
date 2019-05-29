// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import { dispatchToggleTodo, dispatchDeleteTodo } from '../../../Home/Home.action'


const mapDispatchToProps = (_, { _id, todo }) => ({
  onCompletedChange: () => dispatchToggleTodo(_id, todo._id),
  onDelete: () => dispatchDeleteTodo(_id, todo._id),
})

export default connect(null, mapDispatchToProps)(Todo)
