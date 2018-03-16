// modules
import { connect } from 'react-redux'
// components
import Todo from './Todo.presentational'
// views
import { expandingIdView } from '../../../../Main/App.reducer'
// actions
import { dispatchChangeCompleted } from '../../../../Main/App.action'




const mapDispatchToProps = (_, ownProps) => ({
  onChangeCompleted: () => dispatchChangeCompleted(ownProps._id, ownProps.index),
})

export default connect(null, mapDispatchToProps)(Todo)
