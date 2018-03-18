// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import { dispatchToggleCompleted } from '../../../../Main/App.action'


const mapDispatchToProps = (_, ownProps) => ({
  onCompletedChange: () => dispatchToggleCompleted(ownProps._id, ownProps.todo.id),
})

export default connect(null, mapDispatchToProps)(Todo)
