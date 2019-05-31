// views
import {
  tabIndexView,
  userNameView,
  creatorView,
} from '../../../../Home/Home.reducer'

export const checkToShow = (level, assignee = { id: '', name: '' }) => {
  const tabIndex = tabIndexView()
  const userName = userNameView()
  const creator = creatorView()

  switch (level) {
    case 'ICE BOX':
      return (
        (creator && tabIndex === 'EVALUATE') ||
        (assignee.name === userName && tabIndex === 'IN PROGRESS')
      )
    case 'IN PROGRESS':
      return (
        assignee.name === userName &&
        (tabIndex === 'ICE BOX' || tabIndex === 'EVALUATE')
      )
    case 'EVALUATE':
      return assignee.name === userName && tabIndex === 'IN PROGRESS'
    case 'DONE':
      return creator && tabIndex === 'EVALUATE'
    default:
      return false
  }
}

export const nothing = null
