// modules
import { connect } from 'react-redux'
// components
import LevelIcon from './LevelIcon.presentational'
// views
import { tabIndexView } from '../../../../Main/App.reducer'
// actions
import { dispatchChangeTab } from '../../../../Main/App.action'
// selectors
import { getNumberOfTasksInEachLevel } from '../../../../Main/App.selector'
// W
const { W } = window


const mapStateToProps = state => ({
  tabIndex: tabIndexView(),
  numbers: getNumberOfTasksInEachLevel(state),
})

const mapDispatchToProps = () => ({
  onTabClick: (label) => {
    dispatchChangeTab(label)
    if(W) W.analytics('CHANGE_TAB', { to: label })
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(LevelIcon)
