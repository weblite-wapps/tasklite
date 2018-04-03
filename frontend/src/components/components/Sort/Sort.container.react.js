// modules
import { connect } from 'react-redux'
// components
import Sort from './Sort.presentational'
// views
import { sortByDeadlineView, sortByPriorityView } from './Sort.reducer'
// actions
import { dispatchChangeSortByDeadline, dispatchChangeSortByPriority } from './Sort.action'


const mapStateToProps = () => ({
  sortByDeadline: sortByDeadlineView(),
  sortByPriority: sortByPriorityView(),
})

const mapDispatchToProps = () => ({
  changeSortByDeadline: dispatchChangeSortByDeadline,
  changeSortByPriority: dispatchChangeSortByPriority,
})

export default connect(mapStateToProps, mapDispatchToProps)(Sort)
