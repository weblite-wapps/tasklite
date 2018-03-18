// modules
import React from 'react'
import * as R from 'ramda'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import isAfter from 'date-fns/is_after'
// local modules
import { snackbarMessage } from 'weblite-web-snackbar'
// components
import TextField from '../../../../helper/components/TextField/TextField.presentational.react'
import Autocomplete from '../../../../helper/components/Autocomplete/Autocomplete.presentational.react'
import TagList from '../../../../helper/components/TagList/TagList.presentational.react'
import Button from '../../../../helper/components/Button/Button.presentational.react'
import Custom from '../components/Custom/Main/Custom.presentational.react'
import Avatar from '../components/Avatar/Avatar.presentational.jsx'
// helpers
import { formatTime, areTimesOverlapping } from './Add.helper'
import { formattedDate } from '../../../../helper/functions/date.helper'
// scssClasses
import scssClasses from './Add.scss'


class Add extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddLog = this._handleAddLog.bind(this)
    this.handleAddTag = this._handleAddTag.bind(this)
    this.state = {
      nameIsError: false,
      dateIsError: false,
      startTimeIsError: false,
      endTimeIsError: false,
    }
  }

  _handleAddLog() {
    const { title, selectedTags, addLog, changeTab, history } = this.props
    if (title) {
      addLog(title, selectedTags)
      snackbarMessage({ message: 'Added successfully!' })
      changeTab('Home')
      history.push('/')
    } else {
      this.setState({ nameIsError: true })
      snackbarMessage({ message: 'Enter name first!' })
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
    const { dateIsError, startTimeIsError, endTimeIsError } = this.state
    const {
      title, onTitleChange, suggestions, queryTag, onQueryTagChange, tags, onTagClick,
    } = this.props

    return (
      <div className={scssClasses.container}>
        <div className={scssClasses.textField}>
          <TextField
            label="Title"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            isError={this.state.nameIsError}
          />
        </div>
        <div className={scssClasses.textField}>
          <TextField
            label="Fucntor"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            isError={this.state.nameIsError}
          />
        </div>
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
        <div className={scssClasses.textField}>
          <TextField
            label="Priority"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            isError={this.state.nameIsError}
          />
        </div>
        <div className={scssClasses.button}>
          <Button label="Create" onClick={this.handleAddTag} componentName="Add" />
        </div>
      </div>
    )
  }
}

Add.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  logs: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  date: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addLog: PropTypes.func.isRequired,
  changeTab: PropTypes.func.isRequired,
  addCustomLog: PropTypes.func.isRequired,
}

export default withRouter(Add)
