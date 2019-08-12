// modules
import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
// components
import Avatar from '../../../helper/components/Avatar/Avatar.presentational'
// helpers
import Transition from '../../../helper/components/Transition/Transition.presentational'
import { TagPanel } from '../Home/Home.helper.component'
import {
  TextField,
  SelectField,
  DatePicker,
} from './Add.helper.component'
import { AppBarWithStyle as AppBar } from '../Edit/Main/Edit.helper.component'
// styles
import './Add.scss'


const Add = props => {
  const { isError, isOpen } = props

  return (
    <Dialog
      open={isOpen}
      fullScreen
      transitionDuration={250}
      TransitionComponent={Transition}
    >
      <AppBar {...props} label="Add Task" />

      <div className="c--add_container">
        {/* {creator && <Avatar {...props} isError={isError.assignee} />} */}
        <Avatar {...props} isError={isError.assignee} />
        <TextField {...props} isError={isError.title} />
        <TagPanel {...props} />
        <SelectField {...props} />
        <DatePicker {...props} isError={isError.deadline} />
      </div>
    </Dialog>
  )
}

Add.propTypes = {
  isError: PropTypes.shape({}).isRequired,
  // creator: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Add
