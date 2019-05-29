// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// actions
import { dispatchChangeLevel } from '../../../../../Home/Home.action'
// helpers
import { getLevel } from '../../../../../Home/Home.helper'

const mapDispatchToProps = (_, { _id, label, title }) => ({
  onChangeLevel: () => {
    dispatchChangeLevel(_id, getLevel(_id), label, title)
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(Icon)
