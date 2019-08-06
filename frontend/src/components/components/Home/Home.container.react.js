// modules
import { connect } from 'react-redux'
// components
import Home from './Home.presentational.react'
// views
import { tabIndexView, numbersObjectView, isLoadingView } from './Home.reducer'
import { expandModeView } from '../../Main/App.reducer'
import { selectedTagsView, assigneeView } from '../Filter/Filter.reducer'
// actions
import { dispatchChangeTab, dispatchHandleDragTask } from './Home.action'
import { dispatchLoadMore } from '../List/main/List.action'
// selectors
import { getNumberOfTasksInEachLevel } from './Home.selector'
import { getFilteredTasks } from '../Filter/Filter.selector'

const mapStateToProps = state => ({
  tasks: getFilteredTasks(state),
  tabIndex: tabIndexView(),
  isLoading: isLoadingView(),
  expandMode: expandModeView(),
  numbers: getNumberOfTasksInEachLevel(state),
  numbersObject: numbersObjectView(),
  selectedTags: selectedTagsView(),
  assignee: assigneeView(),
})

const mapDispatchToProps = () => ({
  changeTab: dispatchChangeTab,
  dragTask: dispatchHandleDragTask,
  onLoadMore: (skipLength, tabIndex) => dispatchLoadMore(skipLength, tabIndex),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
