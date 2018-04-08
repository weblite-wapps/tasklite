// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest, postRequest } from '../../../helper/functions/request.helper'
import { checkBeforeAddTag, checkBeforeAddTask } from './Add.helper'
// actions
import { ADD_TASK, restoreTask, dispatchAddTask } from '../../Main/App.action'
import { dispatchChangeExpandMode } from '../AppBar/AppBar.action'
import {
  SET_QUERY_TAG_IN_ADD,
  HANDLE_ADD_TAG,
  HANDLE_ADD_TASK,
  fetchTagsInAdd,
  loadTagsDataInAdd,
  dispatchResetInputs,
  dispatchAddTagInAdd,
  dispatchChangeIsError,
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
          created_at: new Date(),
          userId: selectedUser.id,
          wis: wisView(),
        })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
      postRequest('/saveTags')
        .send({ tags, userId: userIdView(), wis: wisView() })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(() => dispatchResetInputs())
    .do(() => dispatchChangeExpandMode('default'))
    .mergeMap(success => [restoreTask(success[0].body), loadTagsDataInAdd(success[1].body)])


const effectHandleAddTag = action$ =>
  action$.ofType(HANDLE_ADD_TAG)
    .map(() => ({ ...checkBeforeAddTag() }))
    .do(({ permission }) => permission && dispatchAddTagInAdd())
    .do(({ permission, message }) => !permission && snackbarMessage({ message }))
    .ignoreElements()


const effectHandleAddTask = action$ =>
  action$.ofType(HANDLE_ADD_TASK)
    .pluck('payload')
    .map(payload => ({ ...payload, ...checkBeforeAddTask() }))
    .do(({ message }) => snackbarMessage({ message }))
    .do(({ isError }) => dispatchChangeIsError(isError))
    .do(({ title, selectedUser, selectedTags, priority, deadline, permission }) => permission &&
      dispatchAddTask(title, selectedUser, selectedTags, priority, deadline))
    .ignoreElements()


export default combineEpics(
  effectSearchTagsEpic,
  addTaskEpic,
  effectHandleAddTag,
  effectHandleAddTask,
)
