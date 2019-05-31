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
  ADD_TASK,
  restoreTask,
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
  loadTagsDataInAdd,
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
    .filter(({ queryTag }) => queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(({ queryTag }) =>
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

const addTaskEpic = action$ =>
  action$
    .ofType(ADD_TASK)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .do(console.log)
    .mergeMap(({ title, assignee, tags, priority, deadline }) =>
      Promise.all([
        postRequest('/saveTask')
          .send({
            title,
            assignee,
            tags,
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
            tags,
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
    .do(console.log)
    .do(success => {
      restoreTask(success[0].body)
      loadTagsDataInAdd(success[1].body)
    })
    .do(() => dispatchChangeExpandMode('default'))
    .do(() => dispatchChangeTab('ICE BOX'))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchResetInputs())
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
    .do(() => window.W && window.W.analytics('ADD_TASK'))
    .ignoreElements()

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
  .do(({ message }) => dispatchChangeSnackbarStage(message))
  .do(({ isError }) => dispatchChangeIsError(isError))
  .do(console.log)
  .do(
    ({
      title,
      assignee,
      selectedTags,
      priority,
      deadline,
      permission
    }) =>
    permission &&
    dispatchAddTask(title, assignee, selectedTags, priority, deadline),
  )
  .ignoreElements()

export default combineEpics(
  effectSearchTagsEpic,
  addTaskEpic,
  effectHandleAddTag,
  effectHandleAddTask,
)
