export const getLimit = (level) => {
  switch (level) {
    case 'ICE BOX':
      return 20
    case 'IN PROGRESS':
      return 20
    case 'EVALUTE':
      return 20
    case 'DONE':
      return 20
    default:
      return 0
  }
}

export const nothing = null