// modules
import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// components
import Todo from '../Todo/Todo.container.react'
// helper
import { formatTime, getRemained, isOnTime } from '../../../../../helper/functions/time.helper'

const SubInfo = ({ label, tags, deadline, sentTime, assignee, todos, _id }) => (
  <React.Fragment>
    <Typography variant="button">
      {label}
    </Typography>
    <Typography variant="caption">
      {tags && R.join(', ', tags)}
      {deadline && `${formatTime(deadline)} - ${getRemained(deadline)} remained`}
      {sentTime && `${formatTime(sentTime)} - ${isOnTime(sentTime, deadline)}`}
      {assignee && assignee}
      {todos && todos.map((todo, index) => (
        <Todo
          key={todo._id}
          _id={_id}
          todo={todo}
          length={todos.length}
          index={index + 1}
        />))
      }
    </Typography>
    <Divider inset />
  </React.Fragment>
)

SubInfo.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  deadline: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  sentTime: PropTypes.string,
  assignee: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  _id: PropTypes.string,
}

SubInfo.defaultProps = {
  tags: [],
  deadline: '',
  sentTime: '',
  assignee: '',
  todos: [],
  _id: '',
}

export default SubInfo
