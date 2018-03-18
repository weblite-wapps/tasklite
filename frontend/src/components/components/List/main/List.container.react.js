// modules
import { connect } from 'react-redux'
// components
import List from './List.presentational'
// views
import { expandingIdView, tabIndexView } from '../../../Main/App.reducer'
// actions
import { dispatchChangeExpnadingId } from '../../../Main/App.action'


const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
  expandingId: expandingIdView(),
})

const mapDispatchToProps = () => ({
  onExpandClick: dispatchChangeExpnadingId,
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
