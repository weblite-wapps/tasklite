// modules
import { connect } from 'react-redux'
// components
import Add from './Add.presentational.react'
// views
import { titleView, priorityView, deadlineView, selectedTagsView, selectedUserView, queryTagView, tagsView } from './Add.reducer'
// actions
import { dispatchChangeTab, dispatchAddTask } from '../../../Main/App.action'
import {
  dispatchChangeTitle,
  dispatchChangePriority,
  dispatchChangeDeadline,
  dispatchSetQueryTagInAdd,
  dispatchChangeSelectedTagsInAdd,
  dispatchAddTagInAdd,
} from './Add.action'
// selector
import { getAddFilteredTagSuggestions } from '../../../Main/App.selector'


const mapStateToProps = state => ({
  title: titleView(),
  priority: priorityView(),
  deadline: deadlineView(),
  selectedTags: selectedTagsView(),
  selectedUser: selectedUserView(),
  queryTag: queryTagView(),
  tagSuggestions: getAddFilteredTagSuggestions(state),
  tags: tagsView(),
})

const mapDispatchToProps = () => ({
  onTitleChange: dispatchChangeTitle,
  onPriorityChange: dispatchChangePriority,
  onDeadlineChange: dispatchChangeDeadline,
  onQueryTagChange: dispatchSetQueryTagInAdd,
  onTagClick: dispatchChangeSelectedTagsInAdd,
  addTag: dispatchAddTagInAdd,
  addTask: dispatchAddTask,
  changeTab: dispatchChangeTab,
})


export default connect(mapStateToProps, mapDispatchToProps)(Add)
