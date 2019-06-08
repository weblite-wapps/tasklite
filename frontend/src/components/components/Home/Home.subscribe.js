// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import {
  FETCH_ALL_TASKS,
  dispatchSetIsLoading,
  dispatchSetAllTasks,
  ADD_TASK,
  FETCH_SINGLE_TASK,
  dispatchAddTask,
  DELETE_TASK,
  dispatchDeleteTask,
} from './Home.action'
import { getRequest } from '../../../helper/functions/request.helper'
import { getQuery } from './Home.helper'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'

const addTaskSubscribe = action$ =>
  action$
    .ofType(FETCH_SINGLE_TASK)
    .pluck('payload')
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(({ data, type }) =>
      getRequest('/fetchSingleTask')
        .query({ ...getQuery(), _id: data })
        .on(
          'error',
          err =>
            err.status !== 304 &&
            dispatchChangeSnackbarStage('Server disconnected!'),
        )
        .then(({ body }) => ({ ...body, type })),
    )
    .do(({ task, type }) => type === ADD_TASK && dispatchAddTask(task))
    .do(({ task, type }) => type === DELETE_TASK && dispatchDeleteTask(task))
    //   dispatchLoadNumberOfTasks(numberOfTasks),
    .do(() => dispatchSetIsLoading(false))
    .ignoreElements()

export default combineEpics(addTaskSubscribe)
