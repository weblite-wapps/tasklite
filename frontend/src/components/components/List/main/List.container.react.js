// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import { expandingIdView } from '../../../Main/App.reducer'
// actions
import { dispatchChangeExpnadingId } from '../../../Main/App.action'


const mapStateToProps = () => ({
  expandingId: expandingIdView(),
})

const mapDispatchToProps = () => ({
  onExpandClick: dispatchChangeExpnadingId,
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
