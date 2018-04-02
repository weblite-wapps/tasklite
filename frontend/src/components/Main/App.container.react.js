// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// views
import { tabIndexView, expandModeView, numbersObjectView } from './App.reducer'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData, dispatchCheckToSetSecondsElapsed, dispatchLoadMore } from './App.action'
// selectors
import { getSortedTasks } from '../components/Sort/Sort.selector'
import { getNumberOfTasksInEachLevel } from './App.selector'

const mapStateToProps = state => ({
  tasks: getSortedTasks(state),
  tabIndex: tabIndexView(),
  expandMode: expandModeView(),
  numbers: getNumberOfTasksInEachLevel(state),
  numbersObject: numbersObjectView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  checkToSetSecondsElapsed: dispatchCheckToSetSecondsElapsed,
  onLoadMore: (skipLength, tabIndex) => dispatchLoadMore(skipLength, tabIndex),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
