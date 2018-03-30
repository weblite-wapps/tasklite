// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'

const getSuggestions = state => state.Filter.suggestions
const getsTags = state => state.Filter.tags


export const getFilteredSuggestions = createSelector(
  [getSuggestions, getsTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)


// export const getAddFilteredUserSuggestions = createSelector(
//   [getAddUserSuggestions, getAddUsers],
//   (suggestions, users) => suggestions.filter(suggestion =>
//     R.reduce(R.and, true, R.map(user => user.name !== suggestion.name, users))),
// )

export const nothing = null
