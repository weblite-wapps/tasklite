// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Autocomplete from '../../../../helper/components/Autocomplete/Autocomplete.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
import TagList from '../../../../helper/components/TagList/TagList.presentational'
import SelectField from '../../../../helper/components/SelectField/SelectField.presentational'
import DatePicker from '../../../../helper/components/DatePicker/DatePicker.presentational'
// scssClasses
import scssClasses from './Add.scss'

export const getTextField = ({
  title, onTitleChange, assignee, onAssigneeChange }, label, isError) => (
    <TextField
      label={label}
      value={label === 'Title' ? title : assignee}
      onChange={e => label === 'Title' ? onTitleChange(e.target.value) : onAssigneeChange(e.target.value)}
      isError={isError}
    />
)

export const getSelectField = ({ priority, onPriorityChange }, label, isError) => (
  <SelectField
    label={label}
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

export const getButton = (label, handleAddTask, componentName) => (
  <div className={scssClasses.button}>
    <Button label={label} onClick={handleAddTask} componentName={componentName} />
  </div>
)

export const getTagPanel = (
  { suggestions, queryTag, onQueryTagChange, tags, onTagClick },
  autocompleteLabel,
  buttonLabel,
  handleAddTag,
) => (
  <React.Fragment>
    <div className={scssClasses.textField}>
      <Autocomplete
        label={autocompleteLabel}
        suggestions={suggestions}
        inputValue={queryTag}
        onInputValueChange={e => onQueryTagChange(e.target.value)}
        onSelect={value => onQueryTagChange(value)}
        onAdd={handleAddTag}
      />
      <Button label={buttonLabel} onClick={handleAddTag} componentName={buttonLabel} />
    </div>
    <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
  </React.Fragment>
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

getTagPanel.propTypes = {
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
}
