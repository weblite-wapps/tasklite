// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
// import { findDOMNode } from 'react-dom'
// import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
// import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
// icons
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
// local modules
// import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Icon from '../components/Icon.presentational'
// helper
import { formatTitle, formatTags, remained } from './List.helper'
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
    const {
      task: { _id, title, tags, priority, deadline }, expandingId, onExpandClick } = this.props

    return (
      <React.Fragment>
        <List disablePadding>
          <div className={classes.text}>
            <div className={classes.title}>
              <img src={`assets/icons/${priority}.png`} alt="priority" className={classes.priority} />
              <Typography variant="subheading" style={{ marginLeft: '10px' }}>
                {
                  formatTitle(title) === title ?
                    <span>{formatTitle(title)}</span> :
                    <Tooltip title={title} placement="bottom" enterDelay={300} leaveDelay={300}>
                      <span>{formatTitle(title)}</span>
                    </Tooltip>
                }
              </Typography>
            </div>
            <div className={classes.actions}>
              <IconButton onClick={() => onExpandClick(_id)}>
                {_id === expandingId ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
              <Icon src="assets/icons/icebox.png" label="ICE BOX" id="Work One" />
              <Icon src="assets/icons/evalute.png" label="EVALUTE" id="Work One" />
            </div>
          </div>
          {
            _id !== expandingId &&
            <div className={classes.text}>
              <Typography variant="body2">
                {remained(deadline)}&nbsp;| {formatTags(tags) || 'No tags!'}&nbsp;| 25%
              </Typography>
            </div>
          }

        </List>

        <Collapse in={expandingId === _id} timeout="auto" unmountOnExit>
            <div className={classes.collapse}>
              <Typography variant="button">
                TAGS
              </Typography>
              <Typography variant="caption">
                {R.join(', ', tags) || 'No tags!'}
              </Typography>
              <Divider light />
              <Typography variant="button">
                DEADLINE
              </Typography>
              <Typography variant="caption">
                {remained(deadline)}
              </Typography>
            </div>
        </Collapse>
        <Divider light />
      </React.Fragment>
    )
  }
}

TaskList.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
}

export default TaskList
