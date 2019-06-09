// modules
import * as R from 'ramda'
// views
import {
  tabIndexView
} from '../../Home/Home.reducer'


export const formatTitle = (name, tabIndex, creator) => {
  if (creator && tabIndex === 'EVALUATE') return name.length > 15 ? `${R.slice(0, 15, name)}...` : name
  return name.length > 20 ? `${R.slice(0, 20, name)}...` : name
}

export const formatTags = (tags) => {
  const joined = R.join(', ', tags)
  return R.length(joined) > 25 ? `${R.slice(0, 25, joined)}...` : joined
}

export const getProgressBarPercent = todos =>
  R.compose(
    Math.round,
    R.multiply(100),
    R.divide(R.__, R.length(todos)),
    R.length,
    R.filter(item => item.completed === true),
  )(todos)

export const checkToShow = (info, todos = []) => {
  const tabIndex = tabIndexView()

  switch (info) {
    case 'deadline':
      return tabIndex === 'ICE BOX' || tabIndex === 'IN PROGRESS'
    case 'sentTime':
      return tabIndex === 'EVALUATE' || tabIndex === 'DONE'
    case 'percent':
      return tabIndex === 'IN PROGRESS' && todos.length > 0
    default:
      return false
  }
}

export const priorityClasses = {
  1: 'c--list_title-high',
  2: 'c--list_title-middle',
  3: 'c--list_title-low',
}