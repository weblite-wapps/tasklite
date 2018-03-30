// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest } from '../../../helper/functions/request.helper'
// actions
// import { dispatchSetIsLoading } from '../../../Main/App.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../../components/components/Add/Main/Add.action'
import {
  SET_QUERY_TAG,
  fetchTags,
  loadTagsDataInFilter,
} from './Filter.action'
// views
import { wisView, userIdView } from '../../Main/App.reducer'


const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY_TAG)
    .pluck('payload')
    .filter(({ queryTag }) => queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(({ queryTag }) =>
      getRequest('/searchTags')
        .query({ wis: wisView(), userId: userIdView(), label: queryTag })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTags(body))


const loadTagsDataEpic = action$ =>
  action$.ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInFilter(action.payload.tags))


export default combineEpics(
  effectSearchTagsEpic,
  loadTagsDataEpic,
)
