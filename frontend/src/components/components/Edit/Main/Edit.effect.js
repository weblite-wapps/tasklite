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
import { dispatchSetEditedTask } from '../../../Main/App.action'
// import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
//helper
import { postRequest } from '../../../../helper/functions/request.helper'
// const
const { W } = window

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
          // dispatchChangeSnackbarStage('Title is empty')
          return false
        })(),
    )
    .map(({ task, title, deadline, assignee, priority }) => ({
      ...task, title, deadline, assignee: assignee.name, priority
    }))
    .do(task => {
      postRequest('/editTask')
        .send(task)
        // .on('error', err => {
        //   if (err.status !== 304) {
        //     dispatchChangeSnackbarStage('Server disconnected!')
        //   }
        // })
        .then(() => dispatchSetEditedTask(task))
        .then(() => {
          dispatchChangeIsOpenDialog(false)
          // dispatchChangeSnackbarStage('Updated Succesfully!')
          dispatch(push('/'))
          dispatchChangeTitleIsError(false)
          W && W.analytics('EDIT_TASK')
        })
    })
    .ignoreElements()

const closeEditEpic = action$ =>
  action$
    .ofType(CLOSE_EDIT)
    .do(() => dispatchChangeIsOpenDialog(false))
    .delay(200)
    .map(() => push('/'))

export default combineEpics(submitEditEpic, closeEditEpic)
