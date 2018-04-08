// modules
import * as R from 'ramda'
// views
import { tabIndexView, creatorView } from '../../../Main/App.reducer'


export const formatTitle = name => name.length > 20 ? `${R.slice(0, 20, name)}...` : name

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

export const checkToShow = (info) => {
  const tabIndex = tabIndexView()
  const creator = creatorView()

  switch (info) {
    case 'assignee': return creator
    case 'deadline': return tabIndex === 'ICE BOX' || tabIndex === 'IN PROGRESS'
    case 'sentTime': return tabIndex === 'EVALUATE'
    case 'percent': return tabIndex === 'IN PROGRESS'
    default: return false
  }
}
