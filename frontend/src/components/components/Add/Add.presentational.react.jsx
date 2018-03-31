// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Avatar from '../../../helper/components/Avatar/Avatar.presentational'
// helpers
import { TagPanel, Button } from '../../Main/App.helper.component'
import { TextField, SelectField, DatePicker } from './Add.helper.component'
// scssClasses
import scssClasses from './Add.scss'


export default class Add extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddTask = this._handleAddTask.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      titleIsError: false,
      priorityIsError: false,
      deadlineIsError: false,
    }
  }

  _handleAddTask() {
    const { title, selectedUser, selectedTags, priority, deadline, addTask } = this.props
    if (title) {
      addTask(title, selectedUser, selectedTags, priority, new Date(deadline))
      snackbarMessage({ message: 'Added successfully!' })
      // changeTab('Home')
    } else {
      this.setState({ titleIsError: true })
      snackbarMessage({ message: 'Enter title first!' })
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
    const { titleIsError, priorityIsError, deadlineIsError } = this.state

    return (
      <div className={scssClasses.container}>
        <Avatar {...this.props} />
        <TextField {...this.props} isError={titleIsError} />
        <TagPanel {...this.props} handleAddTag={this.handleAddTag} />
        <SelectField {...this.props} isError={priorityIsError} />
        <DatePicker {...this.props} isError={deadlineIsError} />
        <Button label="Create" handleAction={this.handleAddTask} />
      </div>
    )
  }
}

Add.propTypes = {
  title: PropTypes.string.isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deadline: PropTypes.string.isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTag: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}
