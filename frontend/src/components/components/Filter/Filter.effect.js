// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// helpers
import { getRequest } from '../../../helper/functions/request.helper'
// actions
import { SET_QUERY_TAG_IN_FILTER, fetchTagsInFilter } from './Filter.action'
// views
import { wisView, userIdView } from '../Home/Home.reducer'

const effectSearchTagsEpic = action$ =>
  action$
    .ofType(SET_QUERY_TAG_IN_FILTER)
    .pluck('payload')
    .filter(queryTag => queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(queryTag =>
      getRequest('/searchTags')
        .query({
          wis: wisView(),
          userId: userIdView(),
          label: queryTag,
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    )
    .map(({ body }) => fetchTagsInFilter(body))

export default combineEpics(effectSearchTagsEpic)
