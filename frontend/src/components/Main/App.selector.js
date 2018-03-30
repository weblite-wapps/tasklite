// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
// import { filteredTags } from './App.helper'

const getAddTagSuggestions = state => state.Add.tagSuggestions
const getAddUserSuggestions = state => state.Add.userSuggestions
// const getReportSuggestions = state => state.Filter.suggestions
const getAddTags = state => state.Add.tags
const getAddUsers = state => state.Add.users
const getTasks = state => state.App.tasks
// const getUsers = state => state.Add.queryUser
// const getFilterTags = state => state.Filter.selectedTags

const getAddFilteredTagSuggestions = createSelector(
  [getAddTagSuggestions, getAddTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

const getAddFilteredUserSuggestions = createSelector(
  [getAddUserSuggestions, getAddUsers],
  (suggestions, users) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(user => user.name !== suggestion.name, users))),
)

// const getReportFilteredSuggestions = createSelector(
//   [getReportSuggestions, getFilterTags],
//   (suggestions, tags) => suggestions.filter(suggestion =>
//     R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
// )

// const getFilteredTasks = createSelector(
//   [getTasks, getAssignee, getFilterTags],
//   (tasks, queryAssignee, selectedTags) => R.compose(
//     R.filter(task => filteredTags(selectedTags, task.tags)),
//     R.filter(task => task.assignee.toLowerCase().includes(queryAssignee.toLowerCase())),
//   )(tasks),
// )

const getNumberOfTasksInEachLevel = createSelector(
  // [getFilteredTasks],
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


export {
  getAddFilteredTagSuggestions,
  getAddFilteredUserSuggestions,
  // getReportFilteredSuggestions,
  // getFilteredTasks,
  getNumberOfTasksInEachLevel,
}
