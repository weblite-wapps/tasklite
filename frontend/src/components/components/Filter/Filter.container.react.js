// modules
import { connect } from 'react-redux'
// components
import Filter from './Filter.presentational'
// views
import { queryTagView, tagsView } from './Filter.reducer'
// actions
import {
  dispatchSetQuery,
  dispatchChangeSelectedTags,
  dispatchAddTag,
  dispatchCalculateTotalDuration,
  dispatchChangeAssigneeInFilter,
} from './Filter.action'
// selector
import { getReportFilteredSuggestions } from '../../Main/App.selector'


const mapStateToProps = state => ({
  queryTag: queryTagView(),
  tags: tagsView(),
  suggestions: getReportFilteredSuggestions(state),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQuery,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
  onAssigneeChange: dispatchChangeAssigneeInFilter,
  calculateTotalDuration: dispatchCalculateTotalDuration,
})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)
