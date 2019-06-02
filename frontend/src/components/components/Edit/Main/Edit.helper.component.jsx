// modules
import React from 'react'
import PropTypes from 'prop-types'
// cores
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import MuiAppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
// icons
import CloseButton from '@material-ui/icons/Close'
import Done from '@material-ui/icons/Done'
// components
// import { TagPanel } from '../../../Main/App.helper.component'
import Avatar from '../../../../helper/components/Avatar/Avatar.presentational'
import {
  TextField,
  SelectField,
  DatePicker,
} from '../../Add/Add.helper.component'
// classes
import './Edit.scss'
import { default as style } from './Edit.style'


const AppBar = ({ label, close, submit, classes }) => (
  <MuiAppBar style={{ position: 'fixed' }}>
    <Toolbar>
      <IconButton className="icon" onClick={close}>
        <CloseButton classes={{ root: classes.svgIcon }} />
      </IconButton>
      <Typography variant="h6" style={{ color: 'white' }}>
        {label}
      </Typography>
      <IconButton className="icon" onClick={submit}>
        <Done classes={{ root: classes.svgIcon }} />
      </IconButton>
    </Toolbar>
  </MuiAppBar>
)

AppBar.propTypes = {
  label: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
}

export const AppBarWithStyle = withStyles(style)(AppBar)

export const Content = props => {
  const { isError, ...other } = props

  return (
    <div style={{ marginTop: '60px' }}>
      <List>
        <Avatar {...other} />
        <TextField {...other} isError={isError.title} />
        {/* <TagPanel {...other} /> */}
        {props.priority && <SelectField {...other} />}
        {props.deadline && <DatePicker {...other} />}
      </List>
    </div>
  )
}

Content.propTypes = {
  isError: PropTypes.shape({}).isRequired,
}