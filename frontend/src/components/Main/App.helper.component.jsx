// modules
import React from 'react'
import PropTypes from 'prop-types'
import MuiCollapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
// components
import CustomizedTaskList from '../components/List/main/List.container.react'
import Autocomplete from '../../helper/components/Autocomplete/Autocomplete.presentational'
import CustomizedButton from '../../helper/components/Button/Button.presentational'
import TagList from '../../helper/components/TagList/TagList.presentational'
// scssClasses
import scssClasses from './App.scss'


export const Collapse = ({ expandMode, label, children }) => (
  <MuiCollapse in={expandMode === label} timeout="auto" unmountOnExit>
    {children}
    <Divider light />
  </MuiCollapse>
)

Collapse.propTypes = {
  expandMode: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}


export const TaskList = ({ tasks, tabIndex }) => (
  tasks.filter(task => task.level === tabIndex)
    .map(task => <CustomizedTaskList key={task._id} task={task} />)
)

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabIndex: PropTypes.string.isRequired,
}


export const Button = ({ label, handleAction }) => (
  <div className={scssClasses.button}>
    <CustomizedButton label={label} onClick={handleAction} componentName="Add" />
  </div>
)

Button.propTypes = {
  label: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
}


export const TagPanel = (
  { suggestions, queryTag, onQueryTagChange, tags, onTagClick, handleAddTag }) => (
    <React.Fragment>
      <div className={scssClasses.textField}>
        <Autocomplete
          label="Tags"
          suggestions={suggestions}
          inputValue={queryTag}
          onInputValueChange={e => onQueryTagChange(e.target.value)}
          onSelect={value => onQueryTagChange(value)}
          onAdd={handleAddTag}
        />
        <CustomizedButton label="ADD" onClick={handleAddTag} componentName="Add" />
      </div>
      <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
    </React.Fragment>
)

TagPanel.propTypes = {
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
}
