// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// actions
import { dispatchChangeLevel } from '../../../../../../Main/App.action'
// helpers
import { getLevel } from '../../../../../../Main/App.helper'

const mapDispatchToProps = (_, { _id, label, title }) => ({
  onChangeLevel: () => {
    dispatchChangeLevel(_id, getLevel(_id), label, title)
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(Icon)
