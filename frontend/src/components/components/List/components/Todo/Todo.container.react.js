// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import { dispatchToggleTodo, dispatchDeleteTodo } from '../../../../Main/App.action'


const mapDispatchToProps = (_, { _id, todo: { id } }) => ({
  onCompletedChange: () => dispatchToggleTodo(_id, id),
  onDelete: () => dispatchDeleteTodo(_id, id),
})

export default connect(null, mapDispatchToProps)(Todo)
