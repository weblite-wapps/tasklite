// modules
import { connect } from 'react-redux'
// components
import LevelBar from './LevelBar.presentational'
// views
import { tabIndexView } from '../../Home/Home.reducer'
// actions
import { dispatchChangeTab } from '../../Home/Home.action'


const mapStateToProps = () => ({ tabIndex: tabIndexView() })

const mapDispatchToProps = () => ({ onTabClick: dispatchChangeTab })

export default connect(mapStateToProps, mapDispatchToProps)(LevelBar)
