// modules
import React from 'react'
import PropTypes from 'prop-types'
// helpers
import RadioGroup from './Sort.helper.component'
// styles
import scssClasses from './Sort.scss'


const Sort = ({ sortByDeadline, sortByPriority, changeSortByDeadline, changeSortByPriority }) => (
  <div className={scssClasses.container}>
    <RadioGroup label="Deadline" checked={sortByDeadline} onChange={changeSortByDeadline} />
    <RadioGroup label="Priority" checked={sortByPriority} onChange={changeSortByPriority} />
  </div>
)

Sort.propTypes = {
  sortByDeadline: PropTypes.string.isRequired,
  sortByPriority: PropTypes.string.isRequired,
  changeSortByDeadline: PropTypes.func.isRequired,
  changeSortByPriority: PropTypes.func.isRequired,
}

export default Sort
