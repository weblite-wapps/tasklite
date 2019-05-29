import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
  Transition,
  Content,
  AppBarWithStyle as AppBar,
} from './Edit.helper.component'

const Edit = props => (
  <Dialog
    open={props.isOpen}
    fullScreen
    transitionDuration={250}
    TransitionComponent={Transition} 
  >
    <AppBar {...props} />
    <Content {...props} />
  </Dialog>
)

export default Edit
