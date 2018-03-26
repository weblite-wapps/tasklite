// modules
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
import MuiButton from 'material-ui/Button'
// components
import ActionButtons from '../components/ActionButtons/main/ActionButtons.presentational'
import SubInfo from '../components/SubInfo/SubInfo.presentational'
import Popover from '../components/Popover/Popover.presentational'
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
// helpers
import { formatTitle, formatTags, getProgressBarPercent } from './List.helper'
import { getRemained } from '../../../../helper/functions/time.helper'
// styles
import scssClasses from './List.scss'


export const TitleAndLevelButtons = ({
  task: { _id, title, priority }, expandingId, onExpandClick, tabIndex,
}) => (
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

    <ActionButtons
      _id={_id}
      expandingId={expandingId}
      onExpandClick={onExpandClick}
      tabIndex={tabIndex}
    />
  </div>
)

export const BriefInfo = ({ task: { _id, assignee, deadline, tags, todos }, expandingId }) => (
  _id !== expandingId &&
  <div className={scssClasses.text}>
    <Typography variant="body2">
      <span>{assignee}&nbsp;|&nbsp;</span>
      <span>{getRemained(deadline)}&nbsp;|&nbsp;</span>
      <span>{formatTags(tags) || 'No tags!'}&nbsp;|&nbsp;</span>
      <span>{`${getProgressBarPercent(todos)}%`}</span>
    </Typography>
  </div>
)


export const ProgressPanel = ({ todos }) => (
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
)

export const FurtherInfo = ({ task: { _id, tags, deadline, sentTime, assignee, todos } }) => (
  <React.Fragment>
    <SubInfo label="TAGS" tags={tags} />
    <SubInfo label="DEADLINE" deadline={deadline} />
    <SubInfo label="SENT TIME" sentTime={sentTime} />
    <SubInfo label="ASSIGNEE" assignee={assignee} />
    <SubInfo label="SUBWORKS" todos={todos} _id={_id} />
  </React.Fragment>
)

export const AddTodo = ({
  task: { todoText }, onTodoTextChange, todoTextError, handleAddTodo }) => (
    <div className={scssClasses.textField}>
      <TextField
        withButton
        label="New Subtask"
        fullWidth={false}
        value={todoText}
        isError={todoTextError}
        onChange={e => onTodoTextChange(e.target.value)}
      />
      <Button label="ADD" onClick={handleAddTodo} componentName="Add" />
    </div>
)

export const DeleteButton = ({ task: { _id }, popoverId, changePopoverId, classes, anchorEl,
  handleOpenPopover, handleYep }) => (
    <div className={scssClasses.button}>
      <MuiButton
        ref={(node) => {
          this.button = node
        }}
        onClick={handleOpenPopover}
        classes={{ raised: classes.Button }}
        variant="raised"
      >
        Delete
      </MuiButton>
      <Popover
        popoverIsOpen={_id === popoverId}
        anchorEl={anchorEl}
        onClose={() => changePopoverId('')}
        onYep={handleYep}
        onNop={() => changePopoverId('')}
      />
    </div>
)

TitleAndLevelButtons.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
  tabIndex: PropTypes.string.isRequired,
}

BriefInfo.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
}

ProgressPanel.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

FurtherInfo.propTypes = {
  task: PropTypes.shape({}).isRequired,
}

AddTodo.propTypes = {
  task: PropTypes.shape({}).isRequired,
  todoTextError: PropTypes.bool.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
}
