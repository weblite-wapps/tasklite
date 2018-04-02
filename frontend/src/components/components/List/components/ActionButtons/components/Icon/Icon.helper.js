// modules
import * as R from 'ramda'
// views
import { tasksView } from '../../../../../../Main/App.reducer'

export const getLevel = _id => R.compose(
  R.prop('level'),
  R.find(R.propEq('_id', _id)),
)(tasksView())

export const nothing = null
