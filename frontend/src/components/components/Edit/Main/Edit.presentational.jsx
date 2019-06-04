import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import {
  Content,
  AppBarWithStyle as AppBar,
} from './Edit.helper.component'
import Transition from '../../../../helper/components/Transition/Transition.presentational'

const Edit = props => (
  <Dialog
    open={props.isOpen}
    fullScreen
    transitionDuration={250}
    TransitionComponent={Transition} 
  >
    <AppBar {...props} label="Edit Task" />
    <Content {...props} />
  </Dialog>
)

export default Edit
