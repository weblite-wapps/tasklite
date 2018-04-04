// modules
import * as R from 'ramda'
// views
import { titleView, selectedUserView, deadlineView, queryTagView, tagsView } from './Add.reducer'


export const checkBeforeAddTask = () => {
  if (titleView() && selectedUserView() && deadlineView()) {
    return ({
      isError: { selectedUser: false, title: false, deadline: false },
      message: 'Added successfully!',
      permission: true,
    })
  } else if (!selectedUserView().id) {
    return ({
      isError: { selectedUser: true, title: false, deadline: false },
      message: 'Select user first!',
      permission: false,
    })
  } else if (!titleView()) {
    return ({
      isError: { selectedUser: true, title: true, deadline: false },
      message: 'Enter title first!',
      permission: false,
    })
  }
  return ({
    isError: { selectedUser: true, title: false, deadline: true },
    message: 'Select deadline first!',
    permission: false,
  })
}


export const checkBeforeAddTag = () => {
  if (R.trim(queryTagView())) {
    if (R.findIndex(R.propEq('label', R.toLower(queryTagView())), tagsView()) < 0) {
      return ({
        message: null,
        permission: true,
      })
    }
    return ({
      message: 'repetitive tag!',
      permission: false,
    })
  }
  return ({
    message: 'select or write tag first!',
    permission: false,
  })
}
