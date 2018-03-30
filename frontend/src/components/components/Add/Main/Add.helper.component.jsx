// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomizedTextField from '../../../../helper/components/TextField/TextField.presentational'
import CustomizedSelectField from '../../../../helper/components/SelectField/SelectField.presentational'
import CustomizedDatePicker from '../../../../helper/components/DatePicker/DatePicker.presentational'


export const TextField = ({ isError, label, title, onTitleChange, assignee, onAssigneeChange }) => (
  <CustomizedTextField
    label={label}
    value={label === 'Title' ? title : assignee}
    onChange={e => label === 'Title' ? onTitleChange(e.target.value) : onAssigneeChange(e.target.value)}
    isError={isError}
  />
)

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAssigneeChange: PropTypes.func.isRequired,
}


export const SelectField = ({ isError, priority, onPriorityChange }) => (
  <CustomizedSelectField
    label="Priority"
    value={priority}
    onChange={e => onPriorityChange(e.target.value)}
    isError={isError}
  />
)

SelectField.propTypes = {
  isError: PropTypes.bool.isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
}


export const DatePicker = ({ isError, deadline, onDeadlineChange }) => (
  <CustomizedDatePicker
    value={deadline}
    onChange={e => onDeadlineChange(e.target.value)}
    isError={isError}
  />
)

DatePicker.propTypes = {
  isError: PropTypes.bool.isRequired,
  deadline: PropTypes.string.isRequired,
  onDeadlineChange: PropTypes.func.isRequired,
}
