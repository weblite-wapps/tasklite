// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { findDOMNode } from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import MuiButton from '@material-ui/core/Button'
// local modules
import { dispatchChangeSnackbarStage } from '../../Snackbar/Snackbar.action'
// components
import Popover from '../components/Popover/Popover.presentational'
// helper
import {
  TitleAndLevelButtons,
  BriefInfo,
  ProgressPanel,
  FurtherInfo,
  AddTodo,
} from './List.helper.component'
// styles
import './List.scss'
import styles from './List.style'

class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTodo = this._handleAddTodo.bind(this)
    this.handleOpenPopover = this._handleOpenPopover.bind(this)
    this.state = {
      anchorEl: null,
    }
  }

  _handleAddTodo() {
    const {
      task: { todoText },
      addTodo,
    } = this.props
    if (R.trim(todoText)) addTodo(todoText)
    else dispatchChangeSnackbarStage('Write something first!')
  }

  _handleOpenPopover() {
    const {
      changePopoverId,
      task: { _id },
    } = this.props
    this.setState({ anchorEl: findDOMNode(this.button) })
    changePopoverId(_id)
  }

  render() {
    const {
      classes,
      // creator,
      user,
      task: { _id, todos, assignee },
      popoverId,
      expandingId,
      deleteTask,
      editTask,
      changePopoverId,
      provided,
      onDragStart,
    } = this.props
    // console.log(this.props.provided.dragHandleProps)
    return (
      <React.Fragment>
        <div className="c--task_header">
          <div {...provided.dragHandleProps}>
            <img
              className="c--list_img"
              src="icons/drag2.png"
              alt="drag icon"
              onMouseDown={onDragStart}
            />
          </div>

          <List disablePadding>
            <TitleAndLevelButtons {...{ ...this.props, expandingId }} />
            <BriefInfo {...this.props} />
          </List>
        </div>

        <Collapse in={expandingId === _id} timeout="auto" unmountOnExit>
          <div className="c--list_collapse">
            {todos.length > 0 && <ProgressPanel todos={todos} />}

            <FurtherInfo {...this.props} />

            <AddTodo {...this.props} handleAddTodo={this.handleAddTodo} />

            <div className="c--list_button">
              <MuiButton
                ref={node => {
                  this.button = node
                }}
                onClick={this.handleOpenPopover}
                classes={{ contained: classes.Button }}
                variant="contained"
              >
                Delete
              </MuiButton>

              <Popover
                popoverIsOpen={_id === popoverId}
                anchorEl={this.state.anchorEl}
                onClose={() => changePopoverId('')}
                onYep={deleteTask}
                onNop={() => changePopoverId('')}
              />

              <MuiButton
                variant="contained"
                onClick={editTask}
                classes={{ contained: classes.Button }}
                style={{ marginLeft: '10px' }}
              >
                Edit
              </MuiButton>
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
  // creator: PropTypes.bool.isRequired,
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  changePopoverId: PropTypes.func.isRequired,
}

export default withStyles(styles)(TaskList)
