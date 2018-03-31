// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
import { filteredTags } from './Filter.helper'


const getSuggestions = state => state.Filter.suggestions
const getsTags = state => state.Filter.tags

export const getFilteredSuggestions = createSelector(
  [getSuggestions, getsTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)


const getTasks = state => state.App.tasks
const getSelectedUser = state => state.Filter.selectedUser
const getSelectedTags = state => state.Filter.selectedTags

export const getFilteredTasks = createSelector(
  [getTasks, getSelectedUser, getSelectedTags],
  (tasks, selectedUser, selectedTags) => R.compose(
    R.filter(task => filteredTags(selectedTags, task.tags)),
    R.filter(task => selectedUser.name ? task.assignee === selectedUser.name : true),
  )(tasks),
)


// export const getAddFilteredUserSuggestions = createSelector(
//   [getAddUserSuggestions, getAddUsers],
//   (suggestions, users) => suggestions.filter(suggestion =>
//     R.reduce(R.and, true, R.map(user => user.name !== suggestion.name, users))),
// )
