// modules
import React from 'react'
import PropTypes from 'prop-types'
// components
import Autocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational'
// scssClasses
import scssClasses from './Filter.scss'


const getAutocomplete = ({ assigneeSuggestions, queryAssignee, onQueryAssigneeChange }) => (
  <div className={scssClasses.textField}>
    <Autocomplete
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

getAutocomplete.propTypes = {
  queryAssignee: PropTypes.string.isRequired,
  assigneeSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryAssigneeChange: PropTypes.func.isRequired,
}

export default getAutocomplete
