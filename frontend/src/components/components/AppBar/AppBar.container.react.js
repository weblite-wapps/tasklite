// modules
import { connect } from 'react-redux'
// components
import AppBar from './AppBar.presentational'
// views
import { isLoadingView, expandModeView } from '../../Main/App.reducer'
// actions
import { dispatchChangeExpandMode } from '../../Main/App.action'


const mapStateToProps = () => ({
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
})

const mapDispatchToProps = () => ({
  changeExpandMode: dispatchChangeExpandMode,
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBar)
