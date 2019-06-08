// modules
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
// components
import ActionButtons from '../components/ActionButtons/main/ActionButtons.presentational'
import SubInfo from '../components/SubInfo/SubInfo.presentational'
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
// helpers
import {
  formatTags,
  formatTitle,
  getProgressBarPercent,
  checkToShow,
  priorityClasses,
} from './List.helper'
import {
  getRemained,
  getPassedTime,
} from '../../../../helper/functions/time.helper'
// styles
import './List.scss'

export const TitleAndLevelButtons = props => {
  const {
    task: { title, priority },
    tabIndex,
    creator,
  } = props

  const priorityClass = priorityClasses[priority]

  const formattedTitle = formatTitle(title, tabIndex, creator)

  return (
    <div className="c--list_text">
      <div className={priorityClass}>
        <Typography variant="subtitle1" style={{ marginLeft: '10px' }}>
          {formattedTitle === title ? (
            <span>{formattedTitle}</span>
          ) : (
            <Tooltip
              title={title}
              placement="bottom"
              enterDelay={150}
              leaveDelay={150}
            >
              <span>{formattedTitle}</span>
            </Tooltip>
          )}
        </Typography>
      </div>
      <ActionButtons {...props} />
    </div>
  )
}

TitleAndLevelButtons.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
}

export const BriefInfo = ({
  task: { _id, assignee, tags, deadline, sentTime, todos },
  expandingId,
}) =>
  _id !== expandingId && (
    <div className="c--list_text">
      <Typography variant="body2">
        <span>{(assignee && assignee.name) || 'No assignee'}&nbsp;|&nbsp;</span>

        {checkToShow('deadline') && (
          <span>{deadline ? getRemained(deadline) : 'No deadline'}</span>
        )}
        {checkToShow('sentTime') && (
          <span>{sentTime ? getPassedTime(sentTime) : 'No sentTime '} ago</span>
        )}
        <span>&nbsp;|&nbsp;{formatTags(tags) || 'No tags'}</span>
        {checkToShow('percent', todos) && (
          <span>&nbsp;|&nbsp;{`${getProgressBarPercent(todos)}%`}</span>
        )}
      </Typography>
    </div>
  )

BriefInfo.propTypes = {
  task: PropTypes.shape({
    assignee: { name: '', id: '' },
  }).isRequired,
  expandingId: PropTypes.string.isRequired,
}

export const ProgressPanel = ({ todos }) => (
  <div className="c--list_progress_panel">
    <Typography variant="button">
      {' '}
      {`${getProgressBarPercent(todos)}%`}{' '}
    </Typography>
    <LinearProgress
      variant="determinate"
      value={getProgressBarPercent(todos)}
      className="c--list_progress"
    />
  </div>
)

ProgressPanel.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export const FurtherInfo = ({
  task: { _id, tags, deadline, level, sentTime, assignee, todos },
  isLoading,
  onDragEnd,
}) => (
  <React.Fragment>
    <SubInfo label="TAGS" tags={tags} />
    <SubInfo label="DEADLINE" deadline={deadline} />
    {(level === 'EVALUATE' || level === 'DONE') && (
      <SubInfo label="SENT TIME" sentTime={sentTime} />
    )}
    <SubInfo label="ASSIGNEE" assignee={assignee} />
    <SubInfo
      label="SUBWORKS"
      todos={todos}
      _id={_id}
      level={level}
      onDragEnd={onDragEnd}
    />
  </React.Fragment>
)

FurtherInfo.propTypes = {
  task: PropTypes.shape({}).isRequired,
}

export const AddTodo = ({
  task: { level, todoText },
  isLoading,
  onTodoTextChange,
  handleAddTodo,
}) =>
  level === 'ICE BOX' || level === 'IN PROGRESS' ? (
    <div className="c--list_textField">
      <TextField
        dir="auto"
        withButton
        label="New Subtask"
        fullWidth={false}
        value={todoText}
        onKeyPress={ev => {
          if (ev.key === 'Enter' && !isLoading) {
            handleAddTodo()
            ev.preventDefault()
          }
        }}
        onChange={e => onTodoTextChange(e.target.value)}
      />
      <Button
        label="ADD"
        onClick={handleAddTodo}
        componentName="Add"
        disabled={isLoading}
      />
    </div>
  ) : null

AddTodo.propTypes = {
  task: PropTypes.shape({}).isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
}
