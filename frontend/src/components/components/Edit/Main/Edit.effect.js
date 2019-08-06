// modules
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { push } from 'react-router-redux'
//actions
import {
  SUBMIT_EDIT,
  CLOSE_EDIT,
  dispatchChangeTitleIsError,
  dispatchChangeIsOpenDialog,
  dispatchLoadTagsDataInEdit,
} from './Edit.action'
import { dispatchSetIsLoading, SET_EDITED_TASK } from '../../Home/Home.action'
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../../helper/functions/request.helper'
import { pulse } from '../../../../helper/functions/realtime.helper'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Add.action'
import { userIdView, wisView } from '../../Home/Home.reducer'

// epics
const submitEditEpic = (action$, { dispatch }) =>
  action$
    .ofType(SUBMIT_EDIT)
    .pluck('payload')
    .filter(
      ({ title }) =>
        title.length ||
        (() => {
          dispatchChangeTitleIsError(true)
          dispatchChangeSnackbarStage('Title is empty')
          return false
        })(),
    )
    .map(({ task, title, deadline, assignee, priority, tags }) => ({
      ...task,
      title,
      deadline,
      assignee,
      priority,
      tags,
    }))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(task =>
      Promise.all([
        postRequest('/editTask')
          .send(task)
          .on('error', err => {
            if (err.status !== 304) {
              dispatchChangeSnackbarStage('Server disconnected!')
            }
          })
          .then(() => task),
        postRequest('/saveTags')
          .send({
            tags: task.tags,
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
    .do(success => pulse(SET_EDITED_TASK, success[0]))
    .do(() => dispatchChangeIsOpenDialog(false))
    .do(() => dispatch(push('/')))
    .do(() => dispatchChangeSnackbarStage('Updated Successfully!'))
    .do(() => dispatchSetIsLoading(false))
    .do(() => dispatchChangeTitleIsError(false))
    .do(() => window.W && window.W.analytics('EDIT_TASK'))
    .filter(task => task.assignee)
    .do(
      ({ title, assignee }) =>
        window.W &&
        window.W.sendNotificationToUsers(
          'Tasklite',
          `${title.toUpperCase()} edited`,
          '',
          [assignee.id],
        ),
    )
    .ignoreElements()

const closeEditEpic = action$ =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatchChangeIsOpenDialog(false))
    .delay(200)
    .map(() => push('/'))

const loadTagsDataEpic = action$ =>
  action$
    .ofType(LOAD_TAGS_DATA_IN_ADD)
    .pluck('payload')
    .pluck('tags')
    .do(dispatchLoadTagsDataInEdit)
    .ignoreElements()

export default combineEpics(submitEditEpic, closeEditEpic, loadTagsDataEpic)
