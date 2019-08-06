// modules
import { connect } from 'react-redux'
// components
import Edit from './Edit.presentational'
// actions
import {
  dispatchSubmitEdit,
  dispatchChangeEditTitle,
  dispatchChangeEditDeadline,
  dispatchChangeEditAssignee,
  dispatchChangeEditPriority,
  dispatchCloseEdit,
  dispatchChangeSelectedTagsInEdit,
  dispatchSetTagQueryInEdit,
  dispatchHandleAddTagInEdit,
} from './Edit.action'
// views
import {
  taskView,
  titleView,
  deadlineView,
  assigneeView,
  priorityView,
  isErrorView,
  anchorElView,
  popoverIdView,
  isOpenDialogView,
  queryTagView,
  selectedTagsView,
  tagsView,
} from './Edit.reducer'
import { usersView, isLoadingView } from '../../Home/Home.reducer'

const mapStateToProps = () => ({
  users: usersView(),
  task: taskView(),
  title: titleView(),
  deadline: deadlineView(),
  assignee: assigneeView(),
  priority: priorityView(),
  isError: isErrorView(),
  anchorEl: anchorElView(),
  popoverId: popoverIdView(),
  isOpen: isOpenDialogView(),
  isLoading: isLoadingView(),
  queryTag: queryTagView(),
  selectedTags: selectedTagsView(),
  suggestions: [],
  tags: tagsView(),
})

const mapDispatchToProps = () => ({
  submit: () =>
    dispatchSubmitEdit({
      task: taskView(),
      title: titleView(),
      deadline: deadlineView(),
      assignee: assigneeView(),
      priority: priorityView(),
      tags: selectedTagsView(),
    }),
  onTitleChange: dispatchChangeEditTitle,
  onDeadlineChange: dispatchChangeEditDeadline,
  onAssigneeChange: dispatchChangeEditAssignee,
  onPriorityChange: dispatchChangeEditPriority,
  close: e => dispatchCloseEdit(),
  onQueryTagChange: dispatchSetTagQueryInEdit,
  onTagClick: dispatchChangeSelectedTagsInEdit,
  handleAddTag: e => dispatchHandleAddTagInEdit(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
