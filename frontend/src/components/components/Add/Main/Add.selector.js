// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'

const getSuggestions = state => state.Add.suggestions
const getTags = state => state.Add.tags


export const getFilteredSuggestions = createSelector(
  [getSuggestions, getTags],
  (suggestions, tags) => suggestions.filter(suggestion =>
    R.reduce(R.and, true, R.map(tag => tag.label !== suggestion.label, tags))),
)

export const nothing = null


// export const getAddFilteredUserSuggestions = createSelector(
//   [getAddUserSuggestions, getAddUsers],
//   (suggestions, users) => suggestions.filter(suggestion =>
//     R.reduce(R.and, true, R.map(user => user.name !== suggestion.name, users))),
// )
