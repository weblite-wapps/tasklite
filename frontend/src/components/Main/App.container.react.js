// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// views
import { tabIndexView, expandModeView, tasksView } from './App.reducer'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData, dispatchCheckToSetSecondsElapsed } from './App.action'
// selectors
// import { getFilteredTasks } from './App.selector'

const mapStateToProps = () => ({
  tasks: tasksView(),
  tabIndex: tabIndexView(),
  expandMode: expandModeView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  checkToSetSecondsElapsed: dispatchCheckToSetSecondsElapsed,
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
