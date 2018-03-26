// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomizedAutocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational'
// scssClasses
import scssClasses from './Filter.scss'


const Autocomplete = ({ assigneeSuggestions, queryAssignee, onQueryAssigneeChange }) => (
  <div className={scssClasses.textField}>
    <CustomizedAutocomplete
      label="Assignee"
      suggestions={assigneeSuggestions}
      inputValue={queryAssignee}
      onInputValueChange={e => onQueryAssigneeChange(e.target.value)}
      onSelect={value => onQueryAssigneeChange(value)}
      // isError={this.state.assigneeIsError}
      // onAdd={this.handleAddTag}
    />
  </div>
)

Autocomplete.propTypes = {
  queryAssignee: PropTypes.string.isRequired,
  assigneeSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryAssigneeChange: PropTypes.func.isRequired,
}

export default Autocomplete
