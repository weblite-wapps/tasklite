// modules
import { connect } from 'react-redux'
// components
import LevelBar from './LevelBar.presentational'
// views
import { tabIndexView } from '../../Main/App.reducer'
// actions
import { dispatchChangeTab } from '../../Main/App.action'


const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
})

const mapDispatchToProps = () => ({
  onTabClick: dispatchChangeTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(LevelBar)
