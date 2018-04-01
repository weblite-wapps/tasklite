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


export const LoadMore = ({ numbers, tabIndex, onLoadMore }) => (
  <div className={scssClasses.button}>
    {
      numbers[tabIndex] === 2 ? (
        <CustomizedButton
          label="Load More"
          onClick={() => onLoadMore(numbers[tabIndex], tabIndex)}
          componentName="Add"
        />
      ) : null
    }
  </div>
)

LoadMore.propTypes = {
  numbers: PropTypes.shape({}).isRequired,
  tabIndex: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
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
  onQueryTagChange: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
}


// export const UserPanel = (
//   { isError, userSuggestions, queryUser, onQueryUserChange, handleAddUser }) => (
//     <React.Fragment>
//       <div className={scssClasses.textField}>
//         <Autocomplete
//           isError={isError}
//           label="Assignee"
//           suggestions={userSuggestions}
//           mode="user"
//           inputValue={queryUser}
//           onInputValueChange={e => onQueryUserChange(e.target.value)}
//           onSelect={value => onQueryUserChange(value)}
//           onAdd={handleAddUser}
//         />
//         <CustomizedButton label="ADD" onClick={handleAddUser} componentName="Add" />
//       </div>
//       <Avatar />
//     </React.Fragment>
// )
//
// UserPanel.propTypes = {
//   isError: PropTypes.bool.isRequired,
//   queryUser: PropTypes.string.isRequired,
//   userSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
//   onQueryUserChange: PropTypes.func.isRequired,
//   handleAddUser: PropTypes.func.isRequired,
// }
