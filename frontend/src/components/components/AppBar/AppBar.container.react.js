// modules
import { connect } from 'react-redux'
// components
import AppBar from './AppBar.presentational'
// views
import { isLoadingView, expandModeView, creatorView, aboutModeView } from '../../Main/App.reducer'
// actions
import { dispatchChangeExpandMode, dispatchSetAboutMode } from '../../Main/App.action'


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
