// modules
import React from 'react'
// helpers
import { Logo, TabBar } from './AppBar.helper.component'
// styles
import scssClasses from './AppBar.scss'

export default props => (
  <div className={scssClasses.container}>
    <Logo {...props} />
    <TabBar {...props} />
  </div>
)
