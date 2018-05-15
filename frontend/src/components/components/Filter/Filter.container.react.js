// modules
import { connect } from 'react-redux'
// components
import Filter from './Filter.presentational'
// views
import { usersView, creatorView } from '../../Main/App.reducer'
import { queryTagView, tagsView, selectedTagsView, selectedUserView } from './Filter.reducer'
// actions
import {
  dispatchSetQueryTagInFilter,
  dispatchChangeSelectedTagsInFilter,
  dispatchAddTagInFilter,
  dispatchChangeSelectedUserInFilter,
} from './Filter.action'
// selector
import { getFilteredSuggestions } from './Filter.selector'


const mapStateToProps = state => ({
  selectedTags: selectedTagsView(),
  selectedUser: selectedUserView(),
  queryTag: queryTagView(),
  suggestions: getFilteredSuggestions(state),
  tags: tagsView(),
  users: usersView(),
  creator: creatorView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQueryTagInFilter,
  onTagClick: dispatchChangeSelectedTagsInFilter,
  addTag: dispatchAddTagInFilter,
  onUserClick: dispatchChangeSelectedUserInFilter,
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
