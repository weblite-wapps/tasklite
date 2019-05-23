export const getLimit = (level) => {
  switch (level) {
    case 'ICE BOX':
      return 10
    case 'IN PROGRESS':
      return 5
    case 'EVALUTE':
      return 5
    case 'DONE':
      return 5
    default:
      return 0
  }
}

export const nothing = null