// modules
import { combineEpics } from 'redux-observable'
import * as R from 'ramda'
import 'rxjs'
import { push } from 'react-router-redux'
// helpers
import {
  getRequest,
  postRequest,
} from '../../../helper/functions/request.helper'
import { pulse } from '../../../helper/functions/realtime.helper'
import { checkBeforeAddTag, checkBeforeAddTask } from './Add.helper'
// actions
import {
  ADD_TASK,
  dispatchChangeTab,
  dispatchSetIsLoading,
} from '../Home/Home.action'
import {
  SET_QUERY_TAG_IN_ADD,
  CLOSE_ADD,
  HANDLE_ADD_TAG,
  HANDLE_ADD_TASK,
  dispatchFetchTagsInAdd,
  dispatchLoadTagsDataInAdd,
  dispatchResetInputs,
  dispatchAddTagInAdd,
  dispatchChangeIsError,
} from './Add.action'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'
// views
import { wisView, userIdView, tasksView } from '../Home/Home.reducer'

import { dispatchChangeIsOpenAddDialog } from './Add.action'

const effectSearchTagsEpic = action$ =>
  action$
    .ofType(SET_QUERY_TAG_IN_ADD)
    .pluck('payload')
    .filter(queryTag => queryTag.trim() !== '')
    .debounceTime(250)
    .do(() => dispatchSetIsLoading(true))
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
    .do(({ body }) => dispatchFetchTagsInAdd(body))
    .do(() => dispatchSetIsLoading(false))
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

const effectHandleAddTask = (action$, { dispatch }) =>
  action$
    .ofType(HANDLE_ADD_TASK)
    .pluck('payload')
    .map(payload => ({
      ...payload,
      ...checkBeforeAddTask(),
      order: R.length(tasksView())
        ? R.prop('order', R.head(tasksView())) + 100
        : 100,
    }))
    .do(
      ({ permission, message }) =>
        !permission && dispatchChangeSnackbarStage(message),
    )
    .do(({ isError }) => dispatchChangeIsError(isError))
    .filter(({ permission }) => permission)
    .do(
      ({ selectedTags }) =>
        !!selectedTags.length && window.W && window.W.analytics('ADD_TAG'),
    )
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ title, assignee, selectedTags, priority, deadline, order }) =>
      Promise.all([
        postRequest('/saveTask')
          .send({
            title,
            assignee,
            tags: selectedTags,
            priority,
            deadline,
            sentTime: '',
            todos: [],
            level: 'ICE BOX',
            created_at: new Date(),
            userId: userIdView(),
            wis: wisView(),
            order,
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
    .do(success => pulse(ADD_TASK, success[0].body))
    .do(success => dispatchLoadTagsDataInAdd(success[1].body))
    .do(() => dispatchChangeIsOpenAddDialog(false))
    .do(() => dispatch(push('/')))
    .do(() => dispatchChangeTab('ICE BOX'))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchResetInputs())
    .do(() => window.W && window.W.analytics('ADD_TASK'))
    .filter(success => success[0].body.assignee)
    .do(success => {
      const { title, assignee } = success[0].body
      window.W &&
        window.W.sendNotificationToUsers(
          'Tasklite',
          `${title.toUpperCase()} added`,
          '',
          [assignee.id],
        )
    })
    .ignoreElements()

const closeAddEpic = action$ =>
  action$
    .ofType(CLOSE_ADD)
    .do(() => dispatchChangeIsOpenAddDialog(false))
    .delay(200)
    .map(() => push('/'))

export default combineEpics(
  effectSearchTagsEpic,
  effectHandleAddTag,
  effectHandleAddTask,
  closeAddEpic,
)
