// modules
import { differenceInSeconds, format, isAfter } from 'date-fns'

const formattedSeconds = seconds => {
  if (Math.floor(seconds / 60) === 0) return 'less than a minute'

  if (Math.floor(seconds / 3600) === 0) return `${Math.floor(seconds / 60)}m`

  if (Math.floor(seconds / 86400) === 0)
    return seconds % 86400 === 0
      ? `${Math.floor(seconds / 3600)}h`
      : `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`

  return seconds % 86400 === 0
    ? `${Math.floor(seconds / 86400)}D`
    : `${Math.floor(seconds / 86400)}D ${Math.floor((seconds % 86400) / 3600)}h`
}

export const getRemained = time => {
  const seconds = differenceInSeconds(time, new Date())
  if (seconds < 0) return 'Overtime'
  return formattedSeconds(seconds)
}

export const getPassedTime = time =>
  formattedSeconds(differenceInSeconds(new Date(), time))

export const formattedTime = time => format(time, 'DD MMM YYYY, HH:mm')

export const isOnTime = (sentTime, deadline) =>
  isAfter(sentTime, deadline) ? 'Delayed' : 'On Time'

export const formattedDate = date => format(date, 'YYYY-MM-DD')
