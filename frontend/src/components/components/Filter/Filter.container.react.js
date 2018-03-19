// modules
import { connect } from 'react-redux'
// components
import Filter from './Filter.presentational'
// views
import { queryTagView, queryAssigneeView, tagsView } from './Filter.reducer'
// actions
import {
  dispatchSetQueryTag,
  dispatchSetQueryAssignee,
  dispatchChangeSelectedTags,
  dispatchAddTag,
} from './Filter.action'
// selector
import { getReportFilteredSuggestions } from '../../Main/App.selector'


const mapStateToProps = state => ({
  queryTag: queryTagView(),
  tags: tagsView(),
  suggestions: getReportFilteredSuggestions(state),
  assigneeSuggestions: getReportFilteredSuggestions(state),
  queryAssignee: queryAssigneeView(),
})

const mapDispatchToProps = () => ({
  onQueryTagChange: dispatchSetQueryTag,
  onQueryAssigneeChange: dispatchSetQueryAssignee,
  onTagClick: dispatchChangeSelectedTags,
  addTag: dispatchAddTag,
})


export default connect(mapStateToProps, mapDispatchToProps)(Filter)
