// modules
import { connect } from 'react-redux'
// components
import AppBar from './AppBar.presentational'
// views
import { isLoadingView, creatorView } from '../../Main/App.reducer'
import { expandModeView, aboutModeView } from './AppBar.reducer'
// actions
import { dispatchChangeExpandMode, dispatchSetAboutMode } from './AppBar.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
  creator: creatorView(),
  aboutMode: aboutModeView(),
})

const mapDispatchToProps = () => ({
  changeExpandMode: dispatchChangeExpandMode,
  setAboutMode: dispatchSetAboutMode,
})

export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
