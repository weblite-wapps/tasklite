// modules
import React from 'react'
import PropTypes from 'prop-types'
// import { findDOMNode } from 'react-dom'
// import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
// import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import ExpandMore from 'material-ui-icons/ExpandMore'
// local modules
// import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Icon from '../components/Icon.presentational'
// helper
import { formattedTitle } from './List.helper'
// styles
import classes from './List.scss'

class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // anchorEl: null,
    }
  }

  render() {
    const { task: { title, tags, priority } } = this.props

    return (
      <React.Fragment>
        <List disablePadding>
          <div className={classes.text}>
            <div className={classes.title}>
              <img src={`assets/icons/${priority}.png`} alt="priority" className={classes.priority} />
              <Typography type="subheading" style={{ marginLeft: '10px' }}>
              {
                formattedTitle(title) === title ?
                  <span>{formattedTitle(title)}</span> :
                  <Tooltip title={title} placement="bottom" enterDelay={300} leaveDelay={300}>
                    <span>{formattedTitle(title)}</span>
                  </Tooltip>
              }
              </Typography>
            </div>
            <div className={classes.actions}>
              <IconButton>
                <ExpandMore />
              </IconButton>
              <Icon src="assets/icons/icebox.png" label="ICE BOX" id="Work One" />
              <Icon src="assets/icons/evalute.png" label="EVALUTE" id="Work One" />
              {/* {this.state.open ? <ExpandLess /> : <ExpandMore />} */}
            </div>
          </div>
          <div className={classes.text}>
            <Typography type="body2">
              12D 17h &nbsp;| &nbsp;| {"TAGONE, TAGTWO" || tags}
            </Typography>
          </div>
        </List>
        {/* <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary="Starred" />
            </ListItem>
          </List>
        </Collapse> */}
        <Divider light />
      </React.Fragment>
    )
  }
}

TaskList.propTypes = {
  task: PropTypes.shape({}).isRequired,
}

export default TaskList
