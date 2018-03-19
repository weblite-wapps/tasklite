// modules
import differenceInSeconds from 'date-fns/difference_in_seconds'
import format from 'date-fns/format'
import isAfter from 'date-fns/is_after'


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

export const getRemained = (time) => {
  const seconds = differenceInSeconds(time, new Date())
  if (seconds < 0) return 'Overtime'
  return formattedSeconds(seconds)
}

export const formatTime = time => format(time, 'DD MMM YYYY, HH:mm')

export const isOnTime = (sentTime, deadline) => {
  if (isAfter(sentTime, deadline)) return 'Delayed'
  return 'On Time'
}
