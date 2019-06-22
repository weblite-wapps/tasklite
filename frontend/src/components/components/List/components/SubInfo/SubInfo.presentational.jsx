// modules
import React from 'react'
import PropTypes from 'prop-types'
// import FlipMove from 'react-flip-move'
import * as R from 'ramda'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
// components
import Todo from '../Todo/Todo.container.react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// helper
import {
  formattedTime,
  getRemained,
  isOnTime,
} from '../../../../../helper/functions/time.helper'

const SubInfo = ({
  label,
  tags,
  deadline,
  times,
  level,
  assignee,
  todos,
  _id,
  onDragEnd,
}) => (
  <React.Fragment>
    <Typography variant="button">{label}</Typography>
    <Typography variant="caption">
      {tags && R.join(', ', tags)}
      {deadline && `${formattedTime(deadline)} - ${getRemained(deadline)}`}
      {times.sentTime &&
        `${formattedTime(times.sentTime)} - ${isOnTime(times.sentTime, times.deadline)}`}
      {assignee && assignee.name}
      {todos && (
        <DragDropContext onDragEnd={e => onDragEnd({ e, todos, task_id: _id })}>
          <Droppable droppableId="droppable">
            {provided => (
              <div ref={provided.innerRef}>
                {' '}
                {/* <FlipMove
                  typeName={null}
                  duration={500}
                  staggerDelayBy={150}
                  enterAnimation="elevator"
                  leaveAnimation={false}
                > */}
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {provided => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Todo
                            key={todo._id}
                            level={level}
                            _id={_id}
                            todo={todo}
                            provided={provided}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                {/* </FlipMove> */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </Typography>
    <Divider variant="inset" />
  </React.Fragment>
)

SubInfo.propTypes = {
  label: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  times: PropTypes.shape({}),
  level: PropTypes.string,
  assignee: PropTypes.shape({}),
  todos: PropTypes.arrayOf(PropTypes.shape({})),
  _id: PropTypes.string,
}

SubInfo.defaultProps = {
  tags: [],
  deadline: '',
  times: {},
  level: '',
  assignee: { name: '', id: '' },
  todos: [],
  _id: '',
}

export default SubInfo
