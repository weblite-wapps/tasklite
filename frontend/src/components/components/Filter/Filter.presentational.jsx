// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TextField from '../../../helper/components/TextField/TextField.presentational.react'
import Button from '../../../helper/components/Button/Button.presentational.react'
import TagList from '../../../helper/components/TagList/TagList.presentational.react'
import Autocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational.react'
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
    const { startDate, endDate, calculateTotalDuration } = this.props
    if (assigneeIsError) calculateTotalDuration()
    else {
      this.setState({ assigneeIsError: true })
      snackbarMessage({ message: 'Choose assignee!' })
    }
  }

  _handleAddTag() {
    const { queryTag, tags, addTag } = this.props
    if (queryTag) {
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
    const { tags, suggestions, onTagClick, queryTag, onQueryTagChange, assignee, onAssigneeChange } = this.props
    return (
      <div className={scssClasses.container}>
        <div className={scssClasses.textField}>
          <TextField
            label="Assignee"
            value={assignee}
            onChange={e => onAssigneeChange(e.target.value)}
            isError={this.state.assigneeIsError}
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
  assignee: PropTypes.string.isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAssigneeChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  calculateTotalDuration: PropTypes.func.isRequired,
}
