// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// helpers
import { Logo, TabBar } from './AppBar.helper.component'
// styles
import scssClasses from './AppBar.scss'
import styles from './AppBar.style'

const AppBar = props => (
  <div className={scssClasses.container}>
    <Logo {...props} />
    <TabBar {...props} />
  </div>
)

export default withStyles(styles)(AppBar)
