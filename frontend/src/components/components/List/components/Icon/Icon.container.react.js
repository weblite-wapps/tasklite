// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// actions
import { dispatchChangeLevel } from '../../../../Main/App.action'


const mapDispatchToProps = () => ({
  onChangeLevel: dispatchChangeLevel,
})

export default connect(null, mapDispatchToProps)(Icon)
