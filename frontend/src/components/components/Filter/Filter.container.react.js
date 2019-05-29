// modules
import { connect } from 'react-redux'
// components
import Filter from './Filter.presentational'
// views
import { usersView } from '../Home/Home.reducer'
import { queryTagView, tagsView, selectedTagsView, assigneeView } from './Filter.reducer'
// actions
import {
  dispatchSetQueryTagInFilter,
  dispatchChangeSelectedTagsInFilter,
  dispatchAddTagInFilter,
  dispatchChangeAssigneeInFilter,
} from './Filter.action'
// selector
import { getFilteredSuggestions } from './Filter.selector'


const mapStateToProps = state => ({
  selectedTags: selectedTagsView(),
  assignee: assigneeView(),
  queryTag: queryTagView(),
  suggestions: getFilteredSuggestions(state),
  tags: tagsView(),
  users: usersView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQueryTagInFilter,
  onTagClick: dispatchChangeSelectedTagsInFilter,
  addTag: dispatchAddTagInFilter,
  onAssigneeChange: dispatchChangeAssigneeInFilter,
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
