// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { filteredTags } from './App.helper'

const getAddSuggestions = state => state.Add.suggestions
const getReportSuggestions = state => state.Filter.suggestions
const getAddTags = state => state.Add.tags
const getTasks = state => state.App.tasks
const getAssignee = state => state.Filter.queryAssignee
const getFilterTags = state => state.Filter.selectedTags

const getAddFilteredSuggestions = createSelector(
  [getAddSuggestions, getAddTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

const getReportFilteredSuggestions = createSelector(
  [getReportSuggestions, getFilterTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

const getFilteredTasks = createSelector(
  [getTasks, getAssignee, getFilterTags],
  (tasks, queryAssignee, selectedTags) => R.compose(
    R.filter(task => filteredTags(selectedTags, task.tags)),
    R.filter(task => task.assignee.toLowerCase().includes(queryAssignee.toLowerCase())),
  )(tasks),
)

const getNumberOfTasksInEachLevel = createSelector(
  [getFilteredTasks],
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


export {
  getAddFilteredSuggestions,
  getReportFilteredSuggestions,
  getNumberOfTasksInEachLevel,
  getFilteredTasks,
}
