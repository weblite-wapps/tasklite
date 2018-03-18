import { createSelector } from 'reselect'
import * as R from 'ramda'
// views
import { tasksView } from './App.reducer'


const getAddSuggestions = state => state.Add.suggestions
const getReportSuggestions = state => state.Report.suggestions
const getAddTags = state => state.Add.tags
const getReportTags = state => state.Report.tags

const getTasks = () => tasksView()

const getAddFilteredSuggestions = createSelector(
  [getAddSuggestions, getAddTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

const getReportFilteredSuggestions = createSelector(
  [getReportSuggestions, getReportTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

const getNumberOfTasksInEachLevel = createSelector(
  [getTasks],
  (tasks) => {
    const groupedTasks = R.compose(R.groupBy(R.prop('level')))(tasks)
    return ({
      ICEBOX: R.length(groupedTasks['ICE BOX']) || 0,
      INPROGRESS: R.length(groupedTasks['IN PROGRESS']) || 0,
      EVALUTE: R.length(groupedTasks.EVALUTE) || 0,
      DONE: R.length(groupedTasks.DONE) || 0,
    })
  },
)


export { getAddFilteredSuggestions, getReportFilteredSuggestions, getNumberOfTasksInEachLevel }
