// modules
import * as R from 'ramda'
import differenceInSeconds from 'date-fns/difference_in_seconds'


const formattedSeconds = (seconds) => {
  if (Math.floor(seconds / 60) === 0) {
    return 'less than a minute'
  } else if (Math.floor(seconds / 3600) === 0) {
    return `${Math.floor(seconds / 60)}m`
  } else if (Math.floor(seconds / 86400) === 0) {
    return seconds % 86400 === 0 ?
      `${Math.floor(seconds / 3600)}h` :
      `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`
  }
  return seconds % 86400 === 0 ?
    `${Math.floor(seconds / 86400)}D` :
    `${Math.floor(seconds / 86400)}D ${Math.floor((seconds % 86400) / 3600)}h`
}

export const remained = (time) => {
  const seconds = differenceInSeconds(time, new Date())
  if (seconds < 0) return 'Overtime'
  return formattedSeconds(seconds)
}

export const formatTitle = name => name.length > 20 ? `${R.slice(0, 20, name)}...` : name

export const formatTags = (tags) => {
  const joined = R.join(', ', tags)
  return R.length(joined) > 25 ? `${R.slice(0, 25, joined)}...` : joined
}
