// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest, postRequest } from '../../../helper/functions/request.helper'
// actions
import { ADD_TASK, restoreTask } from '../../Main/App.action'
import {
  SET_QUERY_TAG_IN_ADD,
  fetchTagsInAdd,
  loadTagsDataInAdd,
  dispatchResetInputs,
} from './Add.action'
// views
import { wisView, userIdView } from '../../Main/App.reducer'


const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY_TAG_IN_ADD)
    .pluck('payload')
    .filter(({ queryTag }) => queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(({ queryTag }) =>
      getRequest('/searchTags')
        .query({ wis: wisView(), userId: userIdView(), label: queryTag })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTagsInAdd(body))


const addTaskEpic = action$ =>
  action$.ofType(ADD_TASK)
    .pluck('payload')
    .mergeMap(({ title, selectedUser, tags, priority, deadline }) => Promise.all([
      postRequest('/saveTask')
        .send({
          title,
          assignee: selectedUser.name,
          tags,
          priority,
          deadline,
          sentTime: '',
          todos: [{ title: 'done', completed: false }],
          level: 'ICE BOX',
          userId: selectedUser.id,
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({ tags, userId: userIdView(), wis: wisView() })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(() => dispatchResetInputs())
    .mergeMap(success => [restoreTask(success[0].body), loadTagsDataInAdd(success[1].body)])


export default combineEpics(
  effectSearchTagsEpic,
  addTaskEpic,
)
