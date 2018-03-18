// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// views
import { tasksView, isLoadingView, tabIndexView } from './App.reducer'
// actions
import { dispatchChangeTab, dispatchSetApi, dispatchFetchTodayData, dispatchCheckToSetSecondsElapsed } from './App.action'


const mapStateToProps = () => ({
  tasks: tasksView(),
  isLoading: isLoadingView(),
  tabIndex: tabIndexView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  setAPI: dispatchSetApi,
  fetchTodayData: dispatchFetchTodayData,
  checkToSetSecondsElapsed: dispatchCheckToSetSecondsElapsed,
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
