// modules
import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
// components
import ActionButtons from '../components/ActionButtons/main/ActionButtons.presentational'
import SubInfo from '../components/SubInfo/SubInfo.presentational'
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
// helpers
import { formatTitle, getProgressBarPercent, checkToShow } from './List.helper'
import { getRemained, getPassedTime } from '../../../../helper/functions/time.helper'
// styles
import scssClasses from './List.scss'


export const TitleAndLevelButtons = ({
  task: { _id, title, priority }, expandingId, onExpandClick,
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
    <ActionButtons _id={_id} expandingId={expandingId} onExpandClick={onExpandClick} />
  </div>
)

TitleAndLevelButtons.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
  onExpandClick: PropTypes.func.isRequired,
}


export const BriefInfo = ({ task: { _id, assignee, deadline, sentTime, todos }, expandingId }) => (
  _id !== expandingId &&
  <div className={scssClasses.text}>
    <Typography variant="body2">
      {checkToShow('assignee') && <span>{assignee}</span>}
      {checkToShow('deadline') && <span>&nbsp;|&nbsp;{getRemained(deadline)}</span>}
      {checkToShow('sentTime') && <span>&nbsp;|&nbsp;{getPassedTime(sentTime)}</span>}
      {/* {checkToShow('tags') && <span>&nbsp;|&nbsp;{formatTags(tags) || 'No tags!'}</span>} */}
      {checkToShow('percent') && <span>&nbsp;|&nbsp;{`${getProgressBarPercent(todos)}%`}</span>}
    </Typography>
  </div>
)

BriefInfo.propTypes = {
  task: PropTypes.shape({}).isRequired,
  expandingId: PropTypes.string.isRequired,
}


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

ProgressPanel.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
}


export const FurtherInfo = ({
  task: { _id, tags, deadline, level, sentTime, assignee, todos },
}) => (
  <React.Fragment>
    <SubInfo label="TAGS" tags={tags} />
    <SubInfo label="DEADLINE" deadline={deadline} />
    {(level === 'EVALUTE' || level === 'DONE') && <SubInfo label="SENT TIME" sentTime={sentTime} />}
    <SubInfo label="ASSIGNEE" assignee={assignee} />
    <SubInfo label="SUBWORKS" todos={todos} _id={_id} level={level} />
  </React.Fragment>
)

FurtherInfo.propTypes = {
  task: PropTypes.shape({}).isRequired,
}


export const AddTodo = ({
  task: { level, todoText }, onTodoTextChange, todoTextError, handleAddTodo,
}) => (
  (level === 'ICE BOX' || level === 'IN PROGRESS') ? (
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
  ) : null
)

AddTodo.propTypes = {
  task: PropTypes.shape({}).isRequired,
  todoTextError: PropTypes.bool.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  onTodoTextChange: PropTypes.func.isRequired,
}
