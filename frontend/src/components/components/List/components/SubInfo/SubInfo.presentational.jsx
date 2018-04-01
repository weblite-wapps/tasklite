// modules
import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import * as R from 'ramda'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
// components
import Todo from '../Todo/Todo.container.react'
// helper
import { formattedTime, getRemained, isOnTime } from '../../../../../helper/functions/time.helper'

const SubInfo = ({ label, tags, deadline, sentTime, level, assignee, todos, _id }) => (
  <React.Fragment>
    <Typography variant="button">
      {label}
    </Typography>
    <Typography variant="caption">
      {tags && R.join(', ', tags)}
      {deadline && `${formattedTime(deadline)} - ${getRemained(deadline)} remained`}
      {sentTime && `${formattedTime(sentTime)} - ${isOnTime(sentTime, deadline)}`}
      {assignee && assignee}
      <FlipMove
        typeName={null}
        duration={500}
        staggerDelayBy={150}
        enterAnimation="elevator"
        leaveAnimation={false}
      >
        {todos && todos.map((todo, index) => (
          <Todo
            key={todo._id}
            level={level}
            _id={_id}
            todo={todo}
            length={todos.length}
            index={index + 1}
          />))
        }
      </FlipMove>
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
  level: PropTypes.string,
  assignee: PropTypes.string,
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  _id: PropTypes.string,
}

SubInfo.defaultProps = {
  tags: [],
  deadline: '',
  sentTime: '',
  level: '',
  assignee: '',
  todos: [],
  _id: '',
}

export default SubInfo
