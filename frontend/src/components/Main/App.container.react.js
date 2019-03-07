// modules
import { connect } from 'react-redux'
// components
import App from './App.presentational.react'
// views
import {
  tabIndexView,
  numbersObjectView,
  userView,
  creatorIdView,
} from './App.reducer'
import { expandModeView } from '../components/AppBar/AppBar.reducer'
// actions
import {
  dispatchChangeTab,
  dispatchSetApi,
  dispatchFetchInitialData,
} from './App.action'
import { dispatchLoadMore } from '../components/List/main/List.action'
// selectors
import { getNumberOfTasksInEachLevel, getSortedTasks } from './App.selector'

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
  fetchInitialData: dispatchFetchInitialData,
  onLoadMore: (skipLength, tabIndex) => dispatchLoadMore(skipLength, tabIndex),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
