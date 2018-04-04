// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { usersView } from '../../Main/App.reducer'
import { titleView, priorityView, deadlineView, selectedTagsView, selectedUserView, queryTagView, tagsView, isErrorView } from './Add.reducer'
// actions
import { dispatchChangeTab } from '../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchChangePriority,
  dispatchChangeDeadline,
  dispatchSetQueryTagInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchChangeSelectedUserInAdd,
  dispatchChangeIsError,
  dispatchHandleAddTag,
  dispatchHandleAddTask,
} from './Add.action'
// selector
import { getFilteredSuggestions } from './Add.selector'


const mapStateToProps = state => ({
  title: titleView(),
  priority: priorityView(),
  deadline: deadlineView(),
  selectedTags: selectedTagsView(),
  selectedUser: selectedUserView(),
  queryTag: queryTagView(),
  suggestions: getFilteredSuggestions(state),
  tags: tagsView(),
  users: usersView(),
  isError: isErrorView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onPriorityChange: dispatchChangePriority,
  onDeadlineChange: dispatchChangeDeadline,
  onQueryTagChange: dispatchSetQueryTagInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  changeTab: dispatchChangeTab,
  onUserClick: dispatchChangeSelectedUserInAdd,
  changeIsError: dispatchChangeIsError,
  handleAddTag: dispatchHandleAddTag,
  handleAddTask: dispatchHandleAddTask,
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
