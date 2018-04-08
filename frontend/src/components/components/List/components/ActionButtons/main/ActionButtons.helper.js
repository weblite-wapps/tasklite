// views
import { tabIndexView, userNameView, creatorView } from '../../../../../Main/App.reducer'


export const checkToShow = (level, assignee) => {
  const tabIndex = tabIndexView()
  const userName = userNameView()
  const creator = creatorView()

  switch (level) {
    case 'ICE BOX': return assignee === userName && (tabIndex === 'IN PROGRESS' || tabIndex === 'EVALUTE')
    case 'IN PROGRESS': return assignee === userName && (tabIndex === 'ICE BOX' || tabIndex === 'EVALUTE')
    case 'EVALUTE': return assignee === userName && tabIndex === 'IN PROGRESS'
    case 'DONE': return creator && tabIndex === 'EVALUTE'
    default: return false
  }
}

export const nothing = null
