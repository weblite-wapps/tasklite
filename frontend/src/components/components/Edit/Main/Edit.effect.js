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
} from './Edit.action'
import { dispatchSetEditedTask, dispatchSetIsLoading } from '../../Home/Home.action'
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../../helper/functions/request.helper'


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
    .map(({ task, title, deadline, assignee, priority }) => ({
      ...task, title, deadline, assignee, priority
    }))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(task => postRequest('/editTask')
        .send(task)
        .on('error', err => {
          if (err.status !== 304) {
            dispatchChangeSnackbarStage('Server disconnected!')
          }
        }).then(() => task))
      .do(task => dispatchSetEditedTask(task)) 
      .do(() => dispatchChangeIsOpenDialog(false))
      .do(() => dispatch(push('/')))
      .do(() => dispatchChangeSnackbarStage('Updated Successfully!'))
      .do(() => dispatchSetIsLoading(false))
      .do(() => dispatchChangeTitleIsError(false))
      .do(() => window.W && window.W.analytics('EDIT_TASK'))
      .filter(task => task.assignee)
      .do(({ title, assignee }) => window.W && window.W.sendNotificationToUsers(
        'Tasklite',
        `${title.toUpperCase()} edited`,
        "",
        [assignee.id],
      ))
      .ignoreElements()

const closeEditEpic = action$ =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatchChangeIsOpenDialog(false))
    .delay(200)
    .map(() => push('/'))

export default combineEpics(submitEditEpic, closeEditEpic)
