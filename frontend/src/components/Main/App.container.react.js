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
} from './App.reducer'
// actions
import {
  dispatchChangeExpandMode,
  dispatchSetAboutMode,
} from './App.action'
import { dispatchSetApi, dispatchFetchInitialData } from '../components/Home/Home.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
  aboutMode: aboutModeView(),
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
})

export default connect(mapStateToProps, mapDispatchToProps)(App)