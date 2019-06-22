// modules
import { differenceInSeconds, isAfter } from 'date-fns'
import jMoment from "moment-jalaali"


const formattedSeconds = seconds => {
  if (Math.floor(seconds / 60) === 0) return 'less than a minute'

  if (Math.floor(seconds / 3600) === 0) return `${Math.floor(seconds / 60)}m`

  if (Math.floor(seconds / 86400) === 0)
    return seconds % 86400 === 0
      ? `${Math.floor(seconds / 3600)}h`
      : `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`

  return `${Math.floor(seconds / 86400)}D` 
}

export const getRemained = time => {
  const seconds = differenceInSeconds(time, new Date())
  if (seconds < 0) return 'Overtime'
  return `${formattedSeconds(seconds)} remained`
}

export const getPassedTime = time =>
  formattedSeconds(differenceInSeconds(new Date(), time))

const convertNumbers2English = function (string) {
  return string.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (c) {
      return c.charCodeAt(0) & 0xf;
  })
}
 
export const formattedTime = time =>
  convertNumbers2English(jMoment(time).format('jYYYY/jM/jD'))


export const isOnTime = (sentTime, deadline) =>
  isAfter(sentTime, deadline) ? 'Delayed' : 'On Time'