// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
import MuiButton from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import { LinearProgress } from 'material-ui/Progress'
// icons
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Icon from '../components/Icon/Icon.container.react'
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
import Popover from '../components/Popover/Popover.presentational'
import SubInfo from '../components/SubInfo/SubInfo.presentational'
// helper
import { formatTitle, formatTags, getProgressBarPercent } from './List.helper'
import { getRemained } from '../../../../helper/functions/time.helper'
// styles
import scssClasses from './List.scss'
import styles from './List.style'


class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTodo = this._handleAddTodo.bind(this)
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
    this.handleClose = this._handleClose.bind(this)
    this.handleYep = this._handleYep.bind(this)
    this.handleNop = this._handleNop.bind(this)
    this.state = {
      anchorEl: null,
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

  _handleOpenPopover() {
    const { changePopoverId, task: { _id } } = this.props
    this.setState({ anchorEl: findDOMNode(this.button) })
    changePopoverId(_id)
  }

  _handleClose() {
    this.props.changePopoverId('')
  }

  _handleYep() {
    const { changePopoverId, deleteTask } = this.props
    changePopoverId('')
    snackbarMessage({ message: 'Deleted successfully !' })
    deleteTask()
  }

  _handleNop() {
    this.props.changePopoverId('')
  }

  render() {
    const { todoTextError } = this.state
    const { task: { _id, title, tags, priority, deadline, todos, assignee, todoText, sentTime },
      onTodoTextChange, tabIndex, expandingId, onExpandClick, popoverId, classes } = this.props

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
              {(tabIndex === 'ICE BOX' || tabIndex === 'EVALUTE') && <Icon src="assets/icons/inp.png" label="IN PROGRESS" _id={_id} />}
              {tabIndex === 'IN PROGRESS' && <Icon src="assets/icons/evalute.png" label="EVALUTE" _id={_id} />}
              {tabIndex === 'EVALUTE' && <Icon src="assets/icons/done.png" label="EVALUTE" _id={_id} />}
            </div>
          </div>
          {
            _id !== expandingId &&
            <div className={scssClasses.text}>
              <Typography variant="body2">
                <span>{assignee}&nbsp;|&nbsp;</span>
                <span>{getRemained(deadline)}&nbsp;|&nbsp;</span>
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

            <SubInfo label="TAGS" tags={tags} />
            <SubInfo label="DEADLINE" deadline={deadline} />
            <SubInfo label="SENT TIME" sentTime={sentTime} />
            <SubInfo label="ASSIGNEE" assignee={assignee} />
            <SubInfo label="SUBWORKS" todos={todos} _id={_id} />

            <div className={scssClasses.textField}>
              <TextField
                withButton
                label="New Subtask"
                fullWidth={false}
                value={todoText}
                isError={todoTextError}
                onChange={e => onTodoTextChange(e.target.value)}
              />
              <Button label="ADD" onClick={this.handleAddTodo} componentName="Add" />
            </div>
            <div className={scssClasses.button}>
              <MuiButton
                ref={(node) => {
                  this.button = node
                }}
                onClick={this.handleOpenPopover}
                classes={{ raised: classes.Button }}
                variant="raised"
              >
                Delete
              </MuiButton>
              <Popover
                popoverIsOpen={_id === popoverId}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                onYep={this.handleYep}
                onNop={this.handleNop}
              />
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
  popoverId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
}

export default withStyles(styles)(TaskList)
