// modules
import * as R from 'ramda'
import setMinutes from 'date-fns/set_minutes'
import setHours from 'date-fns/set_hours'


export const formatTime = time =>
  setHours(setMinutes(new Date(), R.slice(3, 5, time)), R.slice(0, 2, time))


export const filteredTags = (selectedTags, tags) =>
  R.reduce(R.and, true, R.map(tag => R.contains(tag, tags), selectedTags))
