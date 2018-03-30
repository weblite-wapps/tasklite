// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { titleView, assigneeView, priorityView, deadlineView, selectedTagsView, selectedUsersView, queryTagView, queryUserView, tagsView, usersView } from './Add.reducer'
// actions
import { dispatchChangeTab, dispatchAddTask } from '../../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchChangeAssignee,
  dispatchChangePriority,
  dispatchChangeDeadline,
  dispatchSetQueryTagInAdd,
  dispatchSetQueryUserInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchChangeSelectedUsersInAdd,
  dispatchAddTagInAdd,
  dispatchAddUserInAdd,
} from './Add.action'
// selector
import { getAddFilteredTagSuggestions, getAddFilteredUserSuggestions } from '../../../Main/App.selector'


const mapStateToProps = state => ({
  title: titleView(),
  assignee: assigneeView(),
  priority: priorityView(),
  deadline: deadlineView(),
  selectedTags: selectedTagsView(),
  selectedUsers: selectedUsersView(),
  queryTag: queryTagView(),
  queryUser: queryUserView(),
  tagSuggestions: getAddFilteredTagSuggestions(state),
  userSuggestions: getAddFilteredUserSuggestions(state),
  tags: tagsView(),
  users: usersView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onAssigneeChange: dispatchChangeAssignee,
  onPriorityChange: dispatchChangePriority,
  onDeadlineChange: dispatchChangeDeadline,
  onQueryTagChange: dispatchSetQueryTagInAdd,
  onQueryUserChange: dispatchSetQueryUserInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  onUserClick: dispatchChangeSelectedUsersInAdd,
  addTag: dispatchAddTagInAdd,
  addUser: dispatchAddUserInAdd,
  addTask: dispatchAddTask,
  changeTab: dispatchChangeTab,
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
