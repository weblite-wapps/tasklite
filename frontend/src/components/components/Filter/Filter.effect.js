// modules
import * as R from 'ramda'
import { combineEpics } from 'redux-observable'
import 'rxjs'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getRequest } from './Report.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// actions
import { loadLogsData, dispatchSetIsLoading } from '../../../Main/App.action'
import { LOAD_TAGS_DATA_IN_ADD } from '../../Add/Main/Add.action'
import {
  RESET_STAFF_LOGS,
  CHANGE_SELECTED_USER,
  SET_QUERY,
  CALCULATE_TOTAL_DURATION,
  loadStaffLogs,
  resetStaffLogs,
  fetchTags,
  restoreTotalDuration,
  loadTagsDataInReport,
} from './Filter.action'
// views
import { wisView, userIdView } from '../../Main/App.reducer'
import { selectedTagsView, selectedUserView } from './Filter.reducer'


const resetStaffDataEpic = action$ =>
  action$.ofType(CHANGE_SELECTED_USER)
    .map(() => resetStaffLogs(userIdView()))


const loadStaffDataEpic = action$ =>
  action$.ofType(RESET_STAFF_LOGS)
    .filter(() => R.prop(selectedUserView(), pagesView()) === undefined ||
      !R.contains(formattedDate(currentPageView()), pagesView()[selectedUserView()]))
    .do(() => dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => Promise.all([
      getRequest('/fetchLogs')
        .query({
          wis: wisView(),
          userId: selectedUserView(),
          date: formattedDate(currentPageView()),
        })
        .on('error', (err) => {
          if (err.status !== 304) {
            snackbarMessage({ message: 'Server disconnected!' })
            dispatchRemovePage(formattedDate(currentPageView()), selectedUserView())
          }
        }),
      getRequest('/fetchTags')
        .query({ wis: wisView(), userId: selectedUserView() })
        .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })),
    ]))
    .do(() => dispatchSetIsLoading(false))
    .mergeMap(success => ([
      selectedUserView() === userIdView() ?
        loadLogsData(success[0].body) : loadStaffLogs(success[0].body),
      loadTagsDataInReport(success[1].body),
    ]))

const loadTagsDataEpic = action$ =>
  action$.ofType(LOAD_TAGS_DATA_IN_ADD)
    .map(action => loadTagsDataInReport(action.payload.tags))

const effectSearchTagsEpic = action$ =>
  action$.ofType(SET_QUERY)
    .pluck('payload')
    .filter(payload => payload.queryTag.trim() !== '')
    .debounceTime(250)
    .mergeMap(payload => getRequest('/serachTags')
      .query({ wis: wisView(), userId: selectedUserView(), label: payload.queryTag })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .map(({ body }) => fetchTags(body))

const calculateTotalDurationEpic = action$ =>
  action$.ofType(CALCULATE_TOTAL_DURATION)
    .do(() => dispatchSetIsLoading(true))
    .mergeMap(() => getRequest('/calculateTotalDuration')
      .query({
        wis: wisView(),
        userId: selectedUserView(),
        startDate: startDateView(),
        endDate: endDateView(),
        selectedTags: selectedTagsView(),
      })
      .on('error', err => err.status !== 304 && snackbarMessage({ message: 'Server disconnected!' })))
    .do(() => dispatchSetIsLoading(false))
    .map(({ text }) => restoreTotalDuration(text))


// const fetchPreviousDayLogsDataEpic = action$ =>
//   action$.ofType(PREVIOUS_PAGE)
//     .filter(() => !R.contains(formattedDate(currentPageView()), pagesView()[selectedUserView()]))
//     .do(() => dispatchAddPage(formattedDate(currentPageView()), selectedUserView()))
//     .do(() => dispatchSetIsLoading(true))
//     .mergeMap(() => getRequest('/fetchLogs')
//       .query({
//         wis: wisView(),
//         userId: selectedUserView(),
//         date: formattedDate(currentPageView()) })
//       .on('error', (err) => {
//         if (err.status !== 304) {
//           snackbarMessage({ message: 'Server disconnected!' })
//           dispatchRemovePage(formattedDate(currentPageView()), selectedUserView())
//         }
//       }))
//     .do(() => dispatchSetIsLoading(false))
//     .map(({ body }) =>
//       selectedUserView() === userIdView() ?
//         loadLogsData(body) : loadStaffLogs(body))



export default combineEpics(
  resetStaffDataEpic,
  loadStaffDataEpic,
  effectSearchTagsEpic,
  loadTagsDataEpic,
  calculateTotalDurationEpic,
  convertJSONToCSVEpic,
  fetchPreviousDayLogsDataEpic,
  fetchNextDayLogsDataEpic,
  resetCSVEpic,
  updateChartEpic,
)
