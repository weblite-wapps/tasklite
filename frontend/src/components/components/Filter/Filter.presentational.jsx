// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { snackbarMessage } from 'weblite-web-snackbar'
// helpers
import { getTagPanel, getButton } from '../../Main/App.helper.component'
import getAutocomplete from './Filter.helper.component'
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
    return (
      <div className={scssClasses.container}>
        {getAutocomplete({ ...this.props })}
        {getTagPanel({ ...this.props }, this.handleAddTag)}
        {getButton(this.handleApply, 'Apply')}
      </div>
    )
  }
}

Filter.propTypes = {
  // queryAssignee: PropTypes.string.isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  // suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // assigneeSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  // onQueryAssigneeChange: PropTypes.func.isRequired,
  // onQueryTagChange: PropTypes.func.isRequired,
  // onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
}
