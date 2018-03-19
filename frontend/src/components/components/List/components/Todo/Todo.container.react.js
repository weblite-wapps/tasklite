// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import { dispatchToggleCompleted, dispatchDeleteTodo } from '../../../../Main/App.action'


const mapDispatchToProps = (_, { _id, todo: { id } }) => ({
  onCompletedChange: () => dispatchToggleCompleted(_id, id),
  onDelete: () => dispatchDeleteTodo(_id, id),
})

export default connect(null, mapDispatchToProps)(Todo)
