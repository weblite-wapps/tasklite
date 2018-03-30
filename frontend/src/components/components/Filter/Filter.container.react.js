// modules
import { connect } from 'react-redux'
// components
import Filter from './Filter.presentational'
// views
import { queryTagView, tagsView, selectedTagsView } from './Filter.reducer'
// actions
import {
  dispatchSetQueryTag,
  dispatchChangeSelectedTags,
  dispatchAddTag,
} from './Filter.action'
// selector
import { getFilteredSuggestions } from './Filter.selector'


const mapStateToProps = state => ({
  selectedTags: selectedTagsView(),
  queryTag: queryTagView(),
  suggestions: getFilteredSuggestions(state),
  tags: tagsView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQueryTag,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)
