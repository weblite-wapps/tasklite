// views
import // tabIndexView,
// userNameView,
// creatorView,
'../../../../Home/Home.reducer'

export const checkToShow = (
  level,
  assignee = { id: '', name: '' },
  tabIndex,
) => {
  // const userName = userNameView()
  // const creator = creatorView()
  // console.log('tabIndex ', tabIndex)
  switch (level) {
    case 'ICE BOX':
      return tabIndex === 'EVALUATE' || tabIndex === 'IN PROGRESS'
    case 'IN PROGRESS':
      return tabIndex === 'ICE BOX' || tabIndex === 'EVALUATE'
    case 'EVALUATE':
      return tabIndex === 'IN PROGRESS'
    case 'DONE':
      return tabIndex === 'EVALUATE'
    default:
      return false
  }
}

export const nothing = null

// case 'ICE BOX':
//       return (
//         (creator && tabIndex === 'EVALUATE') ||
//         ((creator || assignee.name === userName) && tabIndex === 'IN PROGRESS')
//       )
//     case 'IN PROGRESS':
//       return (
//         (creator || assignee.name === userName) &&
//         (tabIndex === 'ICE BOX' || tabIndex === 'EVALUATE')
//       )
//     case 'EVALUATE':
//       return (creator || assignee.name === userName) && tabIndex === 'IN PROGRESS'
//     case 'DONE':
//       return creator && tabIndex === 'EVALUATE'
//     default:
//       return false
