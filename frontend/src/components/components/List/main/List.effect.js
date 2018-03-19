// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// import { snackbarMessage } from 'weblite-web-snackbar'
// actions
import { CHANGE_LEVEL, setSentTime } from '../../../Main/App.action'


const changeLevelEpic = action$ =>
  action$.ofType(CHANGE_LEVEL)
    .pluck('payload')
    .filter(payload => payload.nextLevel === 'EVALUTE')
    .map(payload => setSentTime(payload._id, new Date()))


export default combineEpics(
  changeLevelEpic,
)
