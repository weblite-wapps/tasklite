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
})

const mapDispatchToProps = () => ({
  submit: () =>
    dispatchSubmitEdit({
      task: taskView(),
      title: titleView(),
      deadline: deadlineView(),
      assignee: assigneeView(),
      priority: priorityView(),
    }),
  onTitleChange: dispatchChangeEditTitle,
  onDeadlineChange: dispatchChangeEditDeadline,
  onAssigneeChange: dispatchChangeEditAssignee,
  onPriorityChange: dispatchChangeEditPriority,
  close: dispatchCloseEdit,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit)
