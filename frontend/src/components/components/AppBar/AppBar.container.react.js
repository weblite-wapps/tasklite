// modules
import {
  connect
} from 'react-redux'
// components
import AppBar from './AppBar.presentational'
// views
import {
  isLoadingView
} from '../../Main/App.reducer'
import {
  expandModeView,
  aboutModeView,
  sortByDeadlineView
} from './AppBar.reducer'
// actions
import {
  dispatchChangeExpandMode,
  dispatchSetAboutMode,
  dispatchToggleSortByDeadline
} from './AppBar.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
  aboutMode: aboutModeView(),
  sortByDeadline: sortByDeadlineView(),
})

const mapDispatchToProps = () => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)