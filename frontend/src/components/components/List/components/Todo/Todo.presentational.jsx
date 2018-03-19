// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'
// components
import Button from '../../../../../helper/components/Button/Button.presentational.react'
// styles
import classes from './Todo.scss'


const Todo = ({ length, index, todo, onCompletedChange, onDelete }) => (
  <div className={classes.todoContainer}>
    <Checkbox
      checked={todo.completed}
      onChange={onCompletedChange}
      style={{ height: '15px', width: '15px' }}
    />
    <Typography variant="caption" style={{ marginLeft: '5px' }}>
      {todo.title}
    </Typography>
    {
      length !== index && <Button label="DELETE" onClick={onDelete} componentName="Todo" />
    }
  </div>
)

Todo.propTypes = {
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({}).isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Todo
