// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
// helpers
import {
  getRequest,
  postRequest,
} from '../../../helper/functions/request.helper'
import { checkBeforeAddTag, checkBeforeAddTask } from './Add.helper'
// actions
import {
  dispatchAddTask, 
  dispatchChangeTab,
  dispatchSetIsLoading,
} from '../Home/Home.action'
import { dispatchChangeExpandMode } from '../../Main/App.action'
import {
  SET_QUERY_TAG_IN_ADD,
  HANDLE_ADD_TAG,
  HANDLE_ADD_TASK,
  fetchTagsInAdd,
  dispatchLoadTagsDataInAdd,
  dispatchResetInputs,
  dispatchAddTagInAdd,
  dispatchChangeIsError
} from "./Add.action"
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// views
import { wisView, userIdView } from '../Home/Home.reducer'

const effectSearchTagsEpic = action$ =>
  action$
    .ofType(SET_QUERY_TAG_IN_ADD)
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
    .map(({ body }) => fetchTagsInAdd(body))

const effectHandleAddTag = action$ =>
  action$
    .ofType(HANDLE_ADD_TAG)
    .map(() => ({
      ...checkBeforeAddTag(),
    }))
    .do(({ permission }) => permission && dispatchAddTagInAdd())
    .do(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    )
    .ignoreElements()

const effectHandleAddTask = action$ =>
  action$
  .ofType(HANDLE_ADD_TASK)
  .pluck('payload')
  .map(payload => ({
    ...payload,
    ...checkBeforeAddTask()
  }))
  .do(
    ({ permission, message }) =>
      !permission && dispatchChangeSnackbarStage(message),
  )
  .do(({ isError }) => dispatchChangeIsError(isError))
  .filter(({ permission }) => permission)
  .do(() => dispatchSetIsLoading(true))
  .mergeMap(({ title, assignee, selectedTags, priority, deadline }) =>
    Promise.all([
      postRequest('/saveTask')
        .send({
          title,
          assignee,
          tags: selectedTags,
          priority,
          deadline,
          sentTime: '',
          todos: [ 
            {
              title: 'done',
              completed: false,
            },
          ],
          level: 'ICE BOX',
          created_at: new Date(),
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
      postRequest('/saveTags')
        .send({
          tags: selectedTags,
          userId: userIdView(),
          wis: wisView(),
        })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        ),
    ]),
  )
  .do(success => {
    dispatchAddTask(success[0].body)
    dispatchLoadTagsDataInAdd(success[1].body)
  })
  .do(() => dispatchChangeExpandMode('default'))
  .do(() => dispatchChangeTab('ICE BOX'))
  .do(() => dispatchSetIsLoading(false))
  .do(() => dispatchResetInputs())
  .do(() => window.W && window.W.analytics('ADD_TASK'))
  .filter(success => success[0].body.assignee)
  .do((success) => {
    const { title, assignee } = success[0].body
    window.W && window.W.sendNotificationToUsers(
    'Tasklite',
    `${title.toUpperCase()} added`,
    "",
    [assignee.id])
    }
  )
  .ignoreElements()

export default combineEpics(
  effectSearchTagsEpic,
  effectHandleAddTag,
  effectHandleAddTask,
)
