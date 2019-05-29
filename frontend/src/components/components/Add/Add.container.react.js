// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { usersView, creatorView } from '../Home/Home.reducer'
import { titleView, priorityView, deadlineView, selectedTagsView, assigneeView, queryTagView, tagsView, isErrorView } from './Add.reducer'
// actions
import { dispatchChangeTab } from '../Home/Home.action'
import {
  dispatchChangeTitle,
  dispatchChangePriority,
  dispatchChangeDeadline,
  dispatchSetQueryTagInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchChangeAssigneeInAdd,
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
  assignee: assigneeView(),
  queryTag: queryTagView(),
  suggestions: getFilteredSuggestions(state),
  tags: tagsView(),
  users: usersView(),
  isError: isErrorView(),
  creator: creatorView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onPriorityChange: dispatchChangePriority,
  onDeadlineChange: dispatchChangeDeadline,
  onQueryTagChange: dispatchSetQueryTagInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  changeTab: dispatchChangeTab,
  onAssigneeChange: dispatchChangeAssigneeInAdd,
  changeIsError: dispatchChangeIsError,
  handleAddTag: dispatchHandleAddTag,
  handleAddTask: dispatchHandleAddTask,
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
