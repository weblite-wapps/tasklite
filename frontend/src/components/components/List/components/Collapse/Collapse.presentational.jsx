// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import MuiButton from 'material-ui/Button'
import MuiCollapse from 'material-ui/transitions/Collapse'
import { LinearProgress } from 'material-ui/Progress'
// components
import Todo from '../Todo/Todo.container.react'
import TextField from '../../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../../helper/components/Button/Button.presentational'
import Popover from '../Popover/Popover.presentational'
// helper
import { getProgressBarPercent } from '../../main/List.helper'
import { formatTime, getRemained, isOnTime } from '../../../../../helper/functions/time.helper'
// css
import scssClasses from './Collapse.scss'
import styles from '../../../../../helper/components/Button/Button.style'

const Collapse = ({
  task: { _id, tags, deadline, todos, assignee, todoText, sentTime },
  classes, expandingId, popoverId, todoTextError, anchorEl, onTodoTextChange,
}) => (
  <MuiCollapse in={expandingId === _id} timeout="auto" unmountOnExit>
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
        {`${formatTime(deadline)} - ${getRemained(deadline)} remained`}
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
          onClose={this.handleClose}
          onYep={this.handleYep}
          onNop={this.handleNop}
        />
      </div>
    </div>
  </MuiCollapse>
)

Collapse.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  popoverId: PropTypes.string.isRequired,
  todoTextError: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({}),
  onTodoTextChange: PropTypes.func.isRequired,
}

Collapse.defaultProps = {
  anchorEl: null,
}

export default withStyles(styles)(Collapse)
