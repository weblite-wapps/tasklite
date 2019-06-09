// modules
import { connect } from 'react-redux'
// components
import Icon from './Icon.presentational'
// actions
import { dispatchHandleChangeLevel } from '../../../../../Home/Home.action'
// helpers
import { getLevel } from '../../../../../Home/Home.helper'

const mapDispatchToProps = (_, { _id, label, title }) => ({
  onChangeLevel: () => {
    dispatchHandleChangeLevel(_id, getLevel(_id), label, title)
  },
})

export default connect(
  null,
  mapDispatchToProps,
)(Icon)
