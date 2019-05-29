// modules
import {
  connect
} from 'react-redux'
// components
import LevelIcon from './LevelIcon.presentational'
// views
import {
  tabIndexView
} from '../../../Home/Home.reducer'
// actions
import {
  dispatchChangeTab
} from '../../../Home/Home.action'
// selectors
import {
  getNumberOfTasksInEachLevel
} from '../../../Home/Home.selector'


const mapStateToProps = state => ({
  tabIndex: tabIndexView(),
  numbers: getNumberOfTasksInEachLevel(state),
})

const mapDispatchToProps = () => ({
  onTabClick: (label) => {
    dispatchChangeTab(label)
    if (window.W) window.W.analytics('CHANGE_TAB', {
      to: label
    })
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(LevelIcon)