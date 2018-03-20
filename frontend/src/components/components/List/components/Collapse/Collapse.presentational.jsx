// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import MuiCollapse from 'material-ui/transitions/Collapse'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import MuiButton from 'material-ui/Button'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TextField from '../../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../../helper/components/Button/Button.presentational'
import Popover from '../Popover/Popover.presentational'
// helper
import { getProgressPanel, getSubInfo } from '../../main/List.helper.component'
// styles
import scssClasses from '../../main/List.scss'
import styles from '../../main/List.style'


class Collapse extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTodo = this._handleAddTodo.bind(this)
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
    this.handleYep = this._handleYep.bind(this)
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

  _handleYep() {
    const { changePopoverId, deleteTask } = this.props
    changePopoverId('')
    snackbarMessage({ message: 'Deleted successfully !' })
    deleteTask()
  }

  render() {
    const { todoTextError, anchorEl } = this.state
    const { task: { _id, title, tags, priority, deadline, todos, assignee, todoText, sentTime },
      onTodoTextChange, tabIndex, expandingId, onExpandClick, popoverId, changePopoverId, classes } = this.props

    return (
      <React.Fragment>
        <MuiCollapse in={expandingId === _id} timeout="auto" unmountOnExit>
          <div className={scssClasses.collapse}>
            {getProgressPanel(todos)}
            {getSubInfo(tags, deadline, sentTime, assignee, todos, _id)}

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
                anchorEl={anchorEl}
                onClose={() => changePopoverId('')}
                onYep={this.handleYep}
                onNop={() => changePopoverId('')}
              />
            </div>
          </div>
        </MuiCollapse>
        <Divider style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
      </React.Fragment>
    )
  }
}

Collapse.propTypes = {
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

export default withStyles(styles)(Collapse)
