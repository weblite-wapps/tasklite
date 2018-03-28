// modules
import React from 'react'
// helpers
import { LeftSide, ActionButton } from './AppBar.helper.component'
// styles
import scssClasses from './AppBar.scss'

export default props => (
  <div className={scssClasses.appBar}>
    <LeftSide {...props} />
    <div className={scssClasses.rightHand}>
      <ActionButton {...props} label="add" src="assets/icons/plus.png" />
      <span style={{ width: '15px' }} />
      <ActionButton {...props} label="filter" src="assets/icons/filter.png" />
    </div>
  </div>
)
