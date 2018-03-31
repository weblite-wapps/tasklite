// modules
import * as R from 'ramda'


export const filteredTags = (selectedTags, tags) =>
  R.reduce(R.and, true, R.map(tag => R.contains(tag, tags), selectedTags))

export const nothing = null
