// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
// import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
// import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { LinearProgress } from 'material-ui/Progress'
// icons
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
// local modules
// import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Icon from '../components/Icon/Icon.presentational'
import Todo from '../components/Todo/Todo.presentational'
import TextField from '../../../../helper/components/TextField/TextField.presentational.react'
// helper
import { formatTitle, formatTags, formatTime, remained, getProgressBarValue } from './List.helper'
// styles
import scssClasses from './List.scss'
import styles from './List.style'


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // anchorEl: null,
    }
  }

  render() {
    const { task: { _id, title, tags, priority, deadline, todos, functor },
      expandingId, onExpandClick, classes } = this.props

    return (
      <React.Fragment>
        <List disablePadding>
          <div className={scssClasses.text}>
            <div className={scssClasses.title}>
              <img src={`assets/icons/${priority}.png`} alt="priority" className={scssClasses.priority} />
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
            <div className={scssClasses.actions}>
              <IconButton onClick={() => onExpandClick(_id)} classes={{ root: classes.IconButton }}>
                {_id === expandingId ?
                  <ExpandLess classes={{ root: classes.SvgIcon }} /> :
                  <ExpandMore classes={{ root: classes.SvgIcon }} />}
              </IconButton>
              <Icon src="assets/icons/icebox.png" label="ICE BOX" id="Work One" />
              <Icon src="assets/icons/evalute.png" label="EVALUTE" id="Work One" />
            </div>
          </div>
          {
            _id !== expandingId &&
            <div className={scssClasses.text}>
              <Typography variant="body2">
                {remained(deadline)}&nbsp;| {formatTags(tags) || 'No tags!'}&nbsp;|&nbsp;
                {`${getProgressBarValue(todos)}%`}
              </Typography>
            </div>
          }
        </List>

        <Collapse in={expandingId === _id} timeout="auto" unmountOnExit>
          <div className={scssClasses.collapse}>
            <div className={scssClasses.progressPannel}>
              <Typography variant="button">
                {`${getProgressBarValue(todos)}%`}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgressBarValue(todos)}
                className={scssClasses.progress}
              />
            </div>

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
              {`${formatTime(deadline)} - ${remained(deadline)} remained`}
            </Typography>
            <Divider light />
            <Typography variant="button">
              FUNCTOR
            </Typography>
            <Typography variant="caption">
              {functor}
            </Typography>
            <Divider light />
            <Typography variant="button" style={{ marginBottom: '5px' }}>
              SUBWORKS
            </Typography>
            {
              todos.map((todo, index) => <Todo key={index} _id={_id} index={index} todo={todo} />)
            }
            {/* <TextField label="New Subtask" /> */}
          </div>
        </Collapse>
        <Divider light />
      </React.Fragment>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
}

export default withStyles(styles)(TaskList)
