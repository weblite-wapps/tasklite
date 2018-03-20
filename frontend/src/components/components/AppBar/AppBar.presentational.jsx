// modules
import React from 'react'
import PropTypes from 'prop-types'
// helpers
import { getActionButton, getLeftHand } from './AppBar.helper.component'
// styles
import scssClasses from './AppBar.scss'

const AppBar = ({ isLoading, expandMode, changeExpandMode }) => (
  <div className={scssClasses.appBar}>
    {getLeftHand(isLoading)}
    <div className={scssClasses.rightHand}>
      {getActionButton(expandMode, changeExpandMode, 'add', 'assets/icons/plus.png')}
      <span style={{ width: '15px' }} />
      {getActionButton(expandMode, changeExpandMode, 'filter', 'assets/icons/filter.png')}
    </div>
  </div>
)

AppBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  expandMode: PropTypes.string.isRequired,
  changeExpandMode: PropTypes.func.isRequired,
}

export default AppBar
