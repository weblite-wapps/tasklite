// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest, postRequest } from '../../../../helper/functions/request.helper'
import { formatTime } from './Add.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// actions
import { ADD_TASK, restoreTask } from '../../../Main/App.action'
import { SET_QUERY_IN_ADD, fetchTagsInAdd, loadTagsDataInAdd, resetInputs } from './Add.action'
// views
import { wisView, userIdView } from '../../../Main/App.reducer'


const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY_IN_ADD)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload =>
      getRequest('/serachTags')
        .query({ wis: wisView(), userId: userIdView(), label: payload.queryTag })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTagsInAdd(body))

const addTaskEpic = action$ =>
  action$.ofType(ADD_TASK)
    .pluck('payload')
    .mergeMap(({ title, assignee, tags, priority, deadline }) => Promise.all([
      postRequest('/saveTask')
        .send({
          title,
          assignee,
          tags,
          priority,
          deadline,
          sentTime: '',
          todos: [{ title: 'done', completed: false }],
          level: 'ICE BOX',
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({
          tags,
          userId: userIdView(),
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .mergeMap(success =>
      [restoreTask(success[0].body), loadTagsDataInAdd(success[1].body)])


export default combineEpics(
  effectSearchTagsEpic,
  addTaskEpic,
)
