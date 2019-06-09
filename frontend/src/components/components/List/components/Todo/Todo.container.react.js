// modules
import {
  connect
} from 'react-redux'
// components
import Todo from './Todo.presentational'
// actions
import {
  dispatchToggleTodo,
  dispatchHandleDeleteTodo,
} from '../../../Home/Home.action'
// views
import {
  isLoadingView
} from '../../../Home/Home.reducer'

const mapStateToProps = () => ({
  isLoading: isLoadingView()
})

const mapDispatchToProps = (_, {
  _id,
  todo
}) => ({
  onCompletedChange: () => dispatchToggleTodo(_id, todo._id),
  onDelete: () => dispatchHandleDeleteTodo(_id, todo._id),
})

export default connect(mapStateToProps, mapDispatchToProps)(Todo)