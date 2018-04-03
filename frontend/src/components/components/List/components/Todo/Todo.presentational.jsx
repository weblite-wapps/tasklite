// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from 'material-ui/Typography'
import Checkbox from 'material-ui/Checkbox'
// components
import Button from '../../../../../helper/components/Button/Button.presentational'
// styles
import scssClasses from './Todo.scss'


const Todo = ({
  level, length, index, todo: { completed, title }, onCompletedChange, onDelete,
}) => (
  <div className={scssClasses.todoContainer}>
    <Checkbox
      disabled={level !== 'IN PROGRESS'}
      checked={completed}
      onChange={onCompletedChange}
      style={{ height: '15px', width: '15px' }}
    />
    <Typography variant="caption" style={{ marginLeft: '5px' }}>{title}</Typography>
    {
      length !== index &&
      <Button
        label="DELETE"
        onClick={onDelete}
        componentName="Todo"
        disabled={level === 'EVALUTE' || level === 'DONE'}
      />
    }
  </div>
)

Todo.propTypes = {
  level: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  todo: PropTypes.shape({}).isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Todo
