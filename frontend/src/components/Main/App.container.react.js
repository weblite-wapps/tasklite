// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// views
import { tabIndexView, expandModeView } from './App.reducer'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData, dispatchCheckToSetSecondsElapsed, dispatchLoadMore } from './App.action'
// selectors
import { getFilteredTasks } from '../components/Filter/Filter.selector'
import { getNumberOfTasksInEachLevel } from './App.selector'

const mapStateToProps = state => ({
  tasks: getFilteredTasks(state),
  tabIndex: tabIndexView(),
  expandMode: expandModeView(),
  numbers: getNumberOfTasksInEachLevel(state),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  checkToSetSecondsElapsed: dispatchCheckToSetSecondsElapsed,
  onLoadMore: (skipLength, tabIndex) => dispatchLoadMore(skipLength, tabIndex),
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
