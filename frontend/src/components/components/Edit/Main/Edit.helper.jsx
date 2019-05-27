// modules
import * as R from 'ramda'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
// cores
import Slide from 'material-ui/transitions/Slide'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import List, { ListItem } from 'material-ui/List'
import Typography from 'material-ui/Typography'
import MuiAppBar from 'material-ui/AppBar'
import { withStyles } from 'material-ui/styles'
// icons
import CancelIcon from 'material-ui-icons/Cancel'
import CloseButton from 'material-ui-icons/Close'
import Done from 'material-ui-icons/Done'
// components
import { TagPanel } from '../../../Main/App.helper.component'
import {
  TextField,
  SelectField,
  DatePicker,
} from '../../Add/Add.helper.component'
// import Popover from '../../../../helper/components/'
// helpers 
// import Picker from '../../../../helper/components/Picker/Picker.presentational'
// classes
import './Edit.scss'
import { default as style } from './Edit.style'

export const Transition = props => <Slide direction="up" {...props} />

const AppBar = ({ close, submit, classes }) => (
  <MuiAppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <IconButton className="icon" onClick={close}>
        <CloseButton classes={{ root: classes.svgIcon }} />
      </IconButton>
      <strong>Edit Log</strong>
      <IconButton className="icon" onClick={submit}>
        <Done classes={{ root: classes.svgIcon }} />
      </IconButton>
    </Toolbar>
  </MuiAppBar>
)

AppBar.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
}

export const AppBarWithStyle = withStyles(style)(AppBar)

export const Content = ({ isError, ...other }) => (
  <div className="intervalList">
    <List>
      <TextField {...other} isError={isError.title} />
      {/* <TagPanel {...other} /> */}
      <SelectField {...other} />
      <DatePicker {...other} />
    </List>
  </div>
)

Content.propTypes = {
  isError: PropTypes.shape({}).isRequired,
}

export const ContentWithStyle = withStyles(style)(Content)