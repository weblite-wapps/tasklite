// modules
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
// helpers
import { Logo, TabBar } from './AppBar.helper.component'
// styles
import './AppBar.scss'
import styles from './AppBar.style'

const AppBar = props => (
  <div className="c--appBar_container">
    <Logo {...props} />
    <TabBar {...props} />
  </div>
)

export default withStyles(styles)(AppBar)
