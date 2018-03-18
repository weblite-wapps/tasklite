// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'
// styles
import classes from './Todo.scss'


const Todo = ({ todo, onCompletedChange }) => (
  <div className={classes.todoContainer}>
    <Checkbox
      checked={todo.completed}
      onChange={onCompletedChange}
      style={{ height: '15px', width: '15px' }}
    />
    <Typography variant="caption" style={{ marginLeft: '5px' }}>
      {todo.title}
    </Typography>
  </div>
)

Todo.propTypes = {
  todo: PropTypes.shape({}).isRequired,
  onCompletedChange: PropTypes.func.isRequired,
}

export default Todo
