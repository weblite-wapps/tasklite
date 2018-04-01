export const getLimit = (level) => {
  switch (level) {
    case 'ICE BOX': return 2
    case 'IN PROGRESS': return 2
    case 'EVALUTE': return 2
    case 'DONE': return 2
    default: return 0
  }
}

export const nothing = null
