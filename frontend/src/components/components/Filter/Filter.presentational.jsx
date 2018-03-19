// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Button from '../../../helper/components/Button/Button.presentational'
import TagList from '../../../helper/components/TagList/TagList.presentational'
import Autocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational'
// css
import scssClasses from './Filter.scss'


export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.handleCalculation = this._handleApply.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      assigneeIsError: false,
    }
  }

  _handleApply() {
    const { assigneeIsError } = this.state
    if (assigneeIsError) calculateTotalDuration()
    else {
      this.setState({ assigneeIsError: true })
      snackbarMessage({ message: 'Choose assignee!' })
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag } = this.props
    if (R.trim(queryTag)) {
      if (R.findIndex(R.propEq('label', R.toLower(queryTag)), tags) < 0) {
        addTag()
      } else {
        snackbarMessage({ message: 'repetitive tag!' })
      }
    } else {
      snackbarMessage({ message: 'select or write tag first!' })
    }
  }

  render() {
    const { tags, suggestions, onTagClick, queryTag, onQueryTagChange,
      assigneeSuggestions, queryAssignee, onQueryAssigneeChange,
    } = this.props

    return (
      <div className={scssClasses.container}>
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

        <div className={scssClasses.textField}>
          <Autocomplete
            label="Tags"
            suggestions={suggestions}
            inputValue={queryTag}
            onInputValueChange={e => onQueryTagChange(e.target.value)}
            onSelect={value => onQueryTagChange(value)}
            onAdd={this.handleAddTag}
          />
          <Button label="Add" onClick={this.handleAddTag} componentName="Add" />
        </div>

        <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />

        <div className={scssClasses.button}>
          <Button label="Apply" onClick={this.handleApply} componentName="Add" />
        </div>
      </div>
    )
  }
}

Filter.propTypes = {
  queryAssignee: PropTypes.string.isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // assigneeSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryAssigneeChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
}
