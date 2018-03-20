// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { findDOMNode } from 'react-dom'
import { withStyles } from 'material-ui/styles'
import List from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
import MuiButton from 'material-ui/Button'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
// helper
import { getTitleAndButtons, getBriefInfo, getProgressPanel, getSubInfo, getTextFieldAndButton, getDeleteButton } from './List.helper.component'
// styles
import scssClasses from './List.scss'
import styles from './List.style'


class TaskList extends React.Component {
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
    const { task: { _id, todos, todoText },
      onTodoTextChange, expandingId, popoverId, changePopoverId, classes } = this.props

    return (
      <React.Fragment>
        <List disablePadding>
          {getTitleAndButtons({ ...this.props })}
          {getBriefInfo({ ...this.props })}
        </List>

        <Collapse in={expandingId === _id} timeout="auto" unmountOnExit>
          <div className={scssClasses.collapse}>
            {getProgressPanel(todos)}
            {getSubInfo({ ...this.props })}
            {getTextFieldAndButton({ ...this.props }, todoTextError, this.handleAddTodo)}
            {getDeleteButton({ ...this.props }, classes, anchorEl, this.handleOpenPopover, this.handleYep)}
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
  expandingId: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
}

export default withStyles(styles)(TaskList)
