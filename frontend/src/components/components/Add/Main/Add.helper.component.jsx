// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import SelectField from '../../../../helper/components/SelectField/SelectField.presentational'
import DatePicker from '../../../../helper/components/DatePicker/DatePicker.presentational'


export const getTextField = ({
  title, onTitleChange, assignee, onAssigneeChange }, label, isError) => (
    <TextField
      label={label}
      value={label === 'Title' ? title : assignee}
      onChange={e => label === 'Title' ? onTitleChange(e.target.value) : onAssigneeChange(e.target.value)}
      isError={isError}
    />
)

export const getSelectField = ({ priority, onPriorityChange }, isError) => (
  <SelectField
    label="Priority"
    value={priority}
    onChange={e => onPriorityChange(e.target.value)}
    isError={isError}
  />
)

export const getDatePicker = ({ deadline, onDeadlineChange }, isError) => (
  <DatePicker
    value={deadline}
    onChange={e => onDeadlineChange(e.target.value)}
    isError={isError}
  />
)


getTextField.propTypes = {
  title: PropTypes.string.isRequired,
  assignee: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAssigneeChange: PropTypes.func.isRequired,
}

getSelectField.propTypes = {
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onPriorityChange: PropTypes.func.isRequired,
}

getDatePicker.propTypes = {
  deadline: PropTypes.string.isRequired,
  onDeadlineChange: PropTypes.func.isRequired,
}
