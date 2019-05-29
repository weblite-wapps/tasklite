// modules
import {
  connect
} from 'react-redux'
// components
import App from './App.presentational'
// views
import {
  isLoadingView
} from '../components/Home/Home.reducer'
import {
  expandModeView,
  aboutModeView,
  sortByDeadlineView
} from './App.reducer'
// actions
import {
  dispatchChangeExpandMode,
  dispatchSetAboutMode,
  dispatchToggleSortByDeadline
} from './App.action'
import { dispatchSetApi, dispatchFetchInitialData } from '../components/Home/Home.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
  aboutMode: aboutModeView(),
  sortByDeadline: sortByDeadlineView(),
})

const mapDispatchToProps = () => ({
  setAPI: dispatchSetApi,
  fetchInitialData: dispatchFetchInitialData,
  changeExpandMode: (mode) => {
    dispatchChangeExpandMode(mode)
    if (window.W) window.W.analytics('CHANGE_MODE', {
      mode
    })
  },
  setAboutMode: dispatchSetAboutMode,
  toggleSortByDeadline: () => {
    dispatchToggleSortByDeadline()
    if (window.W) window.W.analytics('SORT_CLICK')
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(App)