// modules
import {
  combineEpics
} from 'redux-observable'
import 'rxjs'
import {
  push
} from 'react-router-redux'
// actions
import {
  SET_ABOUT_MODE,
  ADD_BUTTON_CLICK
} from './App.action'
import {
  dispatchChangeIsOpenAddDialog
} from '../components/Add/Add.action'


const setAboutModeEpic = (action$, {
    dispatch
  }) =>
  action$.ofType(SET_ABOUT_MODE)
  .pluck('payload')
  .do(value => value ? dispatch(push('/About')) : dispatch(push('/')))
  .ignoreElements()

const handleAddButtonEpic = action$ =>
  action$
  .ofType(ADD_BUTTON_CLICK)
  .do(() => dispatchChangeIsOpenAddDialog(true))
  .map(() => push('/Add'))

export default combineEpics(
  setAboutModeEpic,
  handleAddButtonEpic,
)