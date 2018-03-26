// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import Avatar from '../components/Avatar/Avatar.presentational'
// helpers
import { TagPanel, Button } from '../../../Main/App.helper.component'
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
      assigneeIsError: false,
      priorityIsError: false,
      deadlineIsError: false,
    }
  }

  _handleAddTask() {
    const { title, assignee, selectedTags, priority, deadline, addTask } = this.props
    if (title) {
      addTask(title, assignee, selectedTags, priority, new Date(deadline))
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
    const { titleIsError, assigneeIsError, priorityIsError, deadlineIsError } = this.state

    return (
      <div className={scssClasses.container}>
        <TextField {...this.props} label="Title" isError={titleIsError} />
        <TextField {...this.props} label="Assignee" isError={assigneeIsError} />
        <Avatar />
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
  assignee: PropTypes.string.isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  deadline: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  // suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  // onTitleChange: PropTypes.func.isRequired,
  // onAssigneeChange: PropTypes.func.isRequired,
  // onPriorityChange: PropTypes.func.isRequired,
  // onDeadlineChange: PropTypes.func.isRequired,
  // onQueryTagChange: PropTypes.func.isRequired,
  // onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
}
