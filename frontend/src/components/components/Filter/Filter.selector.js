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


const getTasks = state => state.Home.tasks
const getAssignee = state => state.Filter.assignee
const getSelectedTags = state => state.Filter.selectedTags

export const getFilteredTasks = createSelector(
  [getTasks, getAssignee, getSelectedTags],
  (tasks, assignee, selectedTags) => R.compose(
    R.filter(task => filteredTags(selectedTags, task.tags)),
    R.filter((task) => {
      if (!assignee.name) return true
      else if (assignee.name && !task.assignee) return true
      return task.assignee.name === assignee.name
    }),
  )(tasks)
)
