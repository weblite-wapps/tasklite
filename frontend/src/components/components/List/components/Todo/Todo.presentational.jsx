// modules
import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
// components
import Button from '../../../../../helper/components/Button/Button.presentational'
// styles
import './Todo.scss'

const Todo = ({
  level,
  isLoading,
  todo: { completed, title },
  onCompletedChange,
  onDelete,
}) => (
    <div className="c--todo_container">
      <Checkbox
        disabled={level !== 'IN PROGRESS'}
        checked={completed}
        onChange={onCompletedChange}
        style={{ height: '15px', width: '15px' }}
      />
      <Typography variant="caption" style={{ marginLeft: '5px' }} dir="auto">
        {title}
      </Typography>
      <Button
        label="DELETE"
        onClick={onDelete}
        componentName="Todo"
        disabled={level === 'EVALUATE' || level === 'DONE' || isLoading}
      />
    </div>
  )

Todo.propTypes = {
  level: PropTypes.string.isRequired,
  todo: PropTypes.shape({}).isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default Todo
