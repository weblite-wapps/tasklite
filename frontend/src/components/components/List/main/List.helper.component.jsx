// modules
import React from 'react'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'
import { LinearProgress } from 'material-ui/Progress'
// components
import ActionButtons from '../components/ActionButtons/ActionButtons.presentational'
import SubInfo from '../components/SubInfo/SubInfo.presentational'
// helpers
import { formatTitle, formatTags, getProgressBarPercent } from './List.helper'
import { getRemained } from '../../../../helper/functions/time.helper'
// styles
import scssClasses from './List.scss'


export const getTitleAndButtons = (_id, expandingId, title, priority, onExpandClick, tabIndex) => (
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

export const getBriefInfo = (_id, expandingId, assignee, deadline, tags, todos) => (
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


export const getProgressPanel = todos => (
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

export const getSubInfo = (tags, deadline, sentTime, assignee, todos, _id) => (
  <React.Fragment>
    <SubInfo label="TAGS" tags={tags} />
    <SubInfo label="DEADLINE" deadline={deadline} />
    <SubInfo label="SENT TIME" sentTime={sentTime} />
    <SubInfo label="ASSIGNEE" assignee={assignee} />
    <SubInfo label="SUBWORKS" todos={todos} _id={_id} />
  </React.Fragment>
)
