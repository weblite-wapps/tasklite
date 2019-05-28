// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational.react'
// views
import { tabIndexView, numbersObjectView } from './Home.reducer'
import { expandModeView } from '../../Main/App.reducer'
// actions
import { dispatchChangeTab } from './Home.action'
import { dispatchLoadMore } from '../List/main/List.action'
// selectors
import { getNumberOfTasksInEachLevel, getSortedTasks } from './Home.selector'

const mapStateToProps = state => ({
  tasks: getSortedTasks(state),
  tabIndex: tabIndexView(),
  expandMode: expandModeView(), 
  numbers: getNumberOfTasksInEachLevel(state),
  numbersObject: numbersObjectView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  onLoadMore: (skipLength, tabIndex) => dispatchLoadMore(skipLength, tabIndex),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
