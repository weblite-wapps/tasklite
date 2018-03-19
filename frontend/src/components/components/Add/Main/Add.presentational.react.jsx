// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TextField from '../../../../helper/components/TextField/TextField.presentational'
import Autocomplete from '../../../../helper/components/Autocomplete/Autocomplete.presentational'
import TagList from '../../../../helper/components/TagList/TagList.presentational'
import Button from '../../../../helper/components/Button/Button.presentational'
import Avatar from '../components/Avatar/Avatar.presentational'
import SelectField from '../../../../helper/components/SelectField/SelectField.presentational'
import DatePicker from '../../../../helper/components/DatePicker/DatePicker.presentational'
// scssClasses
import scssClasses from './Add.scss'


class Add extends React.Component {
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
    const { title, onTitleChange, assignee, onAssigneeChange, priority, onPriorityChange,
      deadline, onDeadlineChange, suggestions, queryTag, onQueryTagChange, tags, onTagClick,
    } = this.props

    return (
      <div className={scssClasses.container}>
        <TextField
          label="Title"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          isError={titleIsError}
        />

        <TextField
          label="Assignee"
          value={assignee}
          onChange={e => onAssigneeChange(e.target.value)}
          isError={assigneeIsError}
        />

        <Avatar />

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

        <SelectField
          label="Priority"
          value={priority}
          onChange={e => onPriorityChange(e.target.value)}
          isError={priorityIsError}
        />

        <DatePicker
          value={deadline}
          onChange={e => onDeadlineChange(e.target.value)}
          isError={deadlineIsError}
        />

        <div className={scssClasses.button}>
          <Button label="Create" onClick={this.handleAddTask} componentName="Add" />
        </div>
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
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onAssigneeChange: PropTypes.func.isRequired,
  onPriorityChange: PropTypes.func.isRequired,
  onDeadlineChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  // changeTab: PropTypes.func.isRequired,
}

export default withRouter(Add)
