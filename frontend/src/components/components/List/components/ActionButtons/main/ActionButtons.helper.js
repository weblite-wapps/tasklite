// views
import {
  tabIndexView,
  userNameView,
  creatorView,
} from '../../../../../Main/App.reducer'

export const checkToShow = (level, assignee) => {
  const tabIndex = tabIndexView()
  const userName = userNameView()
  const creator = creatorView()

  switch (level) {
    case 'ICE BOX':
      return (
        (creator && tabIndex === 'EVALUATE') ||
        (assignee === userName && tabIndex === 'IN PROGRESS')
      )
    case 'IN PROGRESS':
      return (
        assignee === userName &&
        (tabIndex === 'ICE BOX' || tabIndex === 'EVALUATE')
      )
    case 'EVALUATE':
      return assignee === userName && tabIndex === 'IN PROGRESS'
    case 'DONE':
      return creator && tabIndex === 'EVALUATE'
    default:
      return false
  }
}

export const nothing = null
