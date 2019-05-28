// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomizedTextField from '../../../helper/components/TextField/TextField.presentational'
import CustomizedSelectField from '../../../helper/components/SelectField/SelectField.presentational'
import CustomizedDatePicker from '../../../helper/components/DatePicker/DatePicker.presentational'
import CustomizedButton from '../../../helper/components/Button/Button.presentational'
// helpers
import { getDate } from './Add.helper'
// styles
import './Add.scss'


export const TextField = ({ isError, title, onTitleChange }) => (
  <CustomizedTextField
    label="Title"
    value={title}
    onChange={e => onTitleChange(e.target.value)}
    isError={isError}
  />
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
}


export const SelectField = ({ priority, onPriorityChange }) => (
  <CustomizedSelectField
    label="Priority"
    value={priority}
    onChange={e => onPriorityChange(e.target.value)}
  />
)

SelectField.propTypes = {
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
}


export const DatePicker = ({ deadline, onDeadlineChange }) => (
  <CustomizedDatePicker
    value={deadline}
    onChange={onDeadlineChange}
  />
)

DatePicker.propTypes = {
  isError: PropTypes.bool,
  deadline: PropTypes.shape({}).isRequired,
  onDeadlineChange: PropTypes.func.isRequired,
}

DatePicker.defaultProps = {
  isError: false,
}


export const Button = ({
  title, assignee, selectedTags, priority, deadline, label, handleAddTask,
}) => (
  <div className="c--add_button">
    <CustomizedButton
      label={label}
      componentName="Add"
      onClick={() => handleAddTask(title, assignee, selectedTags, priority, getDate(deadline))}
    />
  </div>
)

Button.propTypes = {
  title: PropTypes.string.isRequired,
  assignee: PropTypes.shape({}).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deadline: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  handleAddTask: PropTypes.func.isRequired,
}
