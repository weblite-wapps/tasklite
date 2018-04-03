// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { push } from 'react-router-redux'
// actions
import { SET_ABOUT_MODE } from './AppBar.action'


const setAboutModeEpic = (action$, { dispatch }) =>
  action$.ofType(SET_ABOUT_MODE)
    .pluck('payload')
    .do(({ value }) => value ? dispatch(push('/About')) : dispatch(push('/')))
    .ignoreElements()


export default combineEpics(
  setAboutModeEpic,
)
