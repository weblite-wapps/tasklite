// modules
import React from 'react'
import PropTypes from 'prop-types'
import Collapse from 'material-ui/transitions/Collapse'
import Divider from 'material-ui/Divider'
// components
import TaskList from '../components/List/main/List.container.react'
import Autocomplete from '../../helper/components/Autocomplete/Autocomplete.presentational'
import Button from '../../helper/components/Button/Button.presentational'
import TagList from '../../helper/components/TagList/TagList.presentational'
// scssClasses
import scssClasses from './App.scss'


export const getCollapse = (expandMode, label, children) => (
  <Collapse in={expandMode === label} timeout="auto" unmountOnExit>
    {children}
    <Divider light />
  </Collapse>
)

export const getTaskList = (tasks, tabIndex) => (
  tasks.filter(task => task.level === tabIndex)
    .map(task => <TaskList key={task._id} task={task} />)
)

export const getButton = handleAddTask => (
  <div className={scssClasses.button}>
    <Button label="Create" onClick={handleAddTask} componentName="Add" />
  </div>
)

export const getTagPanel = (
  { suggestions, queryTag, onQueryTagChange, tags, onTagClick }, handleAddTag,
) => (
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
      <Button label="ADD" onClick={handleAddTag} componentName="Add" />
    </div>
    <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
  </React.Fragment>
)


getTagPanel.propTypes = {
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  onTagClick: PropTypes.func.isRequired,
}
