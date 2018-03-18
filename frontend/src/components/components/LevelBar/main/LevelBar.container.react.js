// modules
import { connect } from 'react-redux'
// components
import LevelBar from './LevelBar.presentational'
// views
import { tabIndexView } from '../../../Main/App.reducer'
// actions
import { dispatchChangeTab } from '../../../Main/App.action'
// selectors
import { getNumberOfTasksInEachLevel } from '../../../Main/App.selector'

const mapStateToProps = state => ({
  tabIndex: tabIndexView(),
  numbers: getNumberOfTasksInEachLevel(state),
})

const mapDispatchToProps = () => ({
  onTabClick: dispatchChangeTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(LevelBar)
