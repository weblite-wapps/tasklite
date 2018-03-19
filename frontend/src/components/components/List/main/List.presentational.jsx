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
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Icon from '../components/Icon/Icon.container.react'
import Todo from '../components/Todo/Todo.container.react'
import TextField from '../../../../helper/components/TextField/TextField.presentational.react'
import Button from '../../../../helper/components/Button/Button.presentational.react'
// helper
import { formatTitle, formatTags, formatTime, remained, isOnTime, getProgressBarPercent } from './List.helper'
// styles
import scssClasses from './List.scss'
import styles from './List.style'


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTodo = this._handleAddTodo.bind(this)
    this.state = {
      // anchorEl: null,
      todoTextError: false,
    }
  }

  _handleAddTodo() {
    const { task: { todoText }, addTodo } = this.props
    if (R.trim(todoText)) {
      this.setState({ todoTextError: false })
      addTodo(todoText)
    } else {
      this.setState({ todoTextError: true })
      snackbarMessage({ message: 'Write something first!' })
    }
  }

  render() {
    const { todoTextError } = this.state
    const { task: { _id, title, tags, priority, deadline, todos, assignee, todoText, sentTime },
      onTodoTextChange, tabIndex, expandingId, onExpandClick, classes } = this.props

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
              {(tabIndex === 'IN PROGRESS' || tabIndex === 'EVALUTE') && <Icon src="assets/icons/icebox.png" label="ICE BOX" _id={_id} />}
              {(tabIndex === 'ICE BOX' || tabIndex === 'EVALUTE') && <Icon src="assets/icons/inprogress.png" label="IN PROGRESS" _id={_id} />}
              {tabIndex === 'IN PROGRESS' && <Icon src="assets/icons/evalute.png" label="EVALUTE" _id={_id} />}
              {tabIndex === 'EVALUTE' && <Icon src="assets/icons/done.png" label="EVALUTE" _id={_id} />}
            </div>
          </div>
          {
            _id !== expandingId &&
            <div className={scssClasses.text}>
              <Typography variant="body2">
                <span>{assignee}&nbsp;|&nbsp;</span>
                <span>{remained(deadline)}&nbsp;|&nbsp;</span>
                <span>{formatTags(tags) || 'No tags!'}&nbsp;|&nbsp;</span>
                <span>{`${getProgressBarPercent(todos)}%`}</span>
              </Typography>
            </div>
          }
        </List>

        <Collapse in={expandingId === _id} timeout="auto" unmountOnExit>
          <div className={scssClasses.collapse}>
            <div className={scssClasses.progressPannel}>
              <Typography variant="button">
                {`${getProgressBarPercent(todos)}%`}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={getProgressBarPercent(todos)}
                className={scssClasses.progress}
              />
            </div>

            <Typography variant="button">
              TAGS
            </Typography>
            <Typography variant="caption">
              {R.join(', ', tags) || 'No tags!'}
            </Typography>
            <Divider inset />
            <Typography variant="button">
              DEADLINE
            </Typography>
            <Typography variant="caption">
              {`${formatTime(deadline)} - ${remained(deadline)} remained`}
            </Typography>
            <Divider inset />
            <Typography variant="button">
              SENT TIME
            </Typography>
            <Typography variant="caption">
              {`${formatTime(sentTime)} - ${isOnTime(sentTime, deadline)}`}
            </Typography>
            <Divider inset />
            <Typography variant="button">
              ASSIGNEE
            </Typography>
            <Typography variant="caption">
              {assignee}
            </Typography>
            <Divider inset />
            <Typography variant="button" style={{ marginBottom: '5px' }}>
              SUBWORKS
            </Typography>
            {
              todos.map((todo, index) => (
                <Todo
                  key={todo.id}
                  _id={_id}
                  todo={todo}
                  length={todos.length}
                  index={index + 1}
                />))
            }
            <div className={scssClasses.textField}>
              <TextField
                label="New Subtask"
                fullWidth={false}
                value={todoText}
                isError={todoTextError}
                onChange={e => onTodoTextChange(e.target.value)}
              />
              <Button label="ADD" onClick={this.handleAddTodo} componentName="Add" />
            </div>
          </div>
        </Collapse>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
      </React.Fragment>
    )
  }
}

TaskList.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  task: PropTypes.shape({}).isRequired,
  tabIndex: PropTypes.string.isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
}

export default withStyles(styles)(TaskList)
