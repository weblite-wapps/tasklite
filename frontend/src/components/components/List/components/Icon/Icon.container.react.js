// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// views
import { tabIndexView } from '../../../../Main/App.reducer'
// actions
import { dispatchChangeLevel } from '../../../../Main/App.action'


const mapStateToProps = () => ({
  tabIndex: tabIndexView(),
})

const mapDispatchToProps = () => ({
  onChangeLevel: dispatchChangeLevel,
})

export default connect(mapStateToProps, mapDispatchToProps)(Icon)
