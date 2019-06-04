// modules
import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// components
import Todo from '../Todo/Todo.container.react'
// helper
import {
  formattedTime,
  getRemained,
  isOnTime,
} from '../../../../../helper/functions/time.helper'

const SubInfo = ({
  isLoading,
  label,
  tags,
  deadline,
  sentTime,
  level,
  assignee,
  todos,
  _id,
}) => (
  <React.Fragment>
    <Typography variant="button">{label}</Typography>
    <Typography variant="caption">
      {tags && R.join(', ', tags)}
      {deadline && `${formattedTime(deadline)} - ${getRemained(deadline)}`}
      {sentTime &&
        `${formattedTime(sentTime)} - ${isOnTime(sentTime, deadline)}`}
      {assignee && assignee.name}
      <FlipMove
        duration={500}
        staggerDelayBy={150}
        enterAnimation="elevator"
        leaveAnimation={false}
      >
        {todos &&
          todos.map(todo => (
            <Todo key={todo._id} level={level} _id={_id} todo={todo} />
          ))}
      </FlipMove>
    </Typography>
    <Divider variant="inset" />
  </React.Fragment>
)

SubInfo.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  sentTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  level: PropTypes.string,
  assignee: PropTypes.shape({}),
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  _id: PropTypes.string,
}

SubInfo.defaultProps = {
  tags: [],
  deadline: '',
  sentTime: '',
  level: '',
  assignee: { name: '', id: '' },
  todos: [],
  _id: '',
}

export default SubInfo
