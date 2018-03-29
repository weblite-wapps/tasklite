// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { usersView } from '../../../Main/App.reducer'
import { titleView, assigneeView, priorityView, deadlineView, selectedTagsView, queryTagView, tagsView } from './Add.reducer'
// actions
import { dispatchChangeTab, dispatchAddTask } from '../../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchChangeAssignee,
  dispatchChangePriority,
  dispatchChangeDeadline,
  dispatchSetQueryInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchAddTagInAdd,
} from './Add.action'
// selector
import { getAddFilteredSuggestions } from '../../../Main/App.selector'


const mapStateToProps = state => ({
  users: usersView(),
  title: titleView(),
  assignee: assigneeView(),
  priority: priorityView(),
  deadline: deadlineView(),
  selectedTags: selectedTagsView(),
  queryTag: queryTagView(),
  suggestions: getAddFilteredSuggestions(state),
  tags: tagsView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onAssigneeChange: dispatchChangeAssignee,
  onPriorityChange: dispatchChangePriority,
  onDeadlineChange: dispatchChangeDeadline,
  onQueryTagChange: dispatchSetQueryInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  addTag: dispatchAddTagInAdd,
  addTask: dispatchAddTask,
  changeTab: dispatchChangeTab,
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
