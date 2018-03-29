// views
import { tabIndexView, creatorView } from '../../../../../Main/App.reducer'

export const checkToShow = (level) => {
  const tabIndex = tabIndexView()
  const creator = creatorView()

  switch (level) {
    case 'ICE BOX': return (!creator && tabIndex === 'IN PROGRESS') || (creator && tabIndex === 'EVALUTE')
    case 'IN PROGRESS': return !creator && (tabIndex === 'ICE BOX' || tabIndex === 'EVALUTE')
    case 'EVALUTE': return !creator && tabIndex === 'IN PROGRESS'
    case 'DONE': return creator && tabIndex === 'EVALUTE'
    default: return false
  }
}

export const nothing = null
