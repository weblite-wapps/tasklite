// modules
import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
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
  // isLoading,
  label,
  tags,
  deadline,
  sentTime,
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
      {sentTime &&
        `${formattedTime(sentTime)} - ${isOnTime(sentTime, deadline)}`}
      {assignee && assignee.name}
      {todos && (
        <DragDropContext onDragEnd={e => onDragEnd({ e, todos, task_id: _id })}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
                // style={getListStyle(snapshot.isDraggingOver)}
              >
                {' '}
                <FlipMove
                  typeName={null}
                  duration={500}
                  staggerDelayBy={150}
                  enterAnimation="elevator"
                  leaveAnimation={false}
                >
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo._id}
                      draggableId={todo._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // style={getItemStyle(
                          //   snapshot.isDragging,
                          //   provided.draggableProps.style,
                          // )}
                        >
                          <Todo
                            key={todo._id}
                            level={level}
                            _id={_id}
                            todo={todo}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </FlipMove>
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
