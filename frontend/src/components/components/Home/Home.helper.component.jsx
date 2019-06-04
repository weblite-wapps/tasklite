// modules
import React from 'react'
import PropTypes from 'prop-types'
import FlipMove from 'react-flip-move'
import MuiCollapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
// components
import CustomizedTaskList from '../List/main/List.container.react'
import Autocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational'
import CustomizedButton from '../../../helper/components/Button/Button.presentational'
import TagList from '../../../helper/components/TagList/TagList.presentational'
// styles
import './Home.scss'

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
  <FlipMove
    typeName={null}
    duration={500}
    staggerDelayBy={150}
    enterAnimation="elevator"
    leaveAnimation={false}
  >
    {tasks
      .filter(task => task.level === tabIndex)
      .map(task => (
        <CustomizedTaskList key={task._id} task={task} />
      ))}
  </FlipMove>
)

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabIndex: PropTypes.string.isRequired,
}

export const LoadMore = ({
  expandMode,
  numbersObject,
  numbers,
  tabIndex,
  onLoadMore,
}) => (
    <div className="c--home_button">
      {expandMode !== 'filter' && numbersObject[tabIndex] > numbers[tabIndex] ? (
        <CustomizedButton
          label="Load More"
          onClick={() => onLoadMore(numbers[tabIndex], tabIndex)}
          componentName="Add"
        />
      ) : null}
    </div>
  )

LoadMore.propTypes = {
  expandMode: PropTypes.string.isRequired,
  numbersObject: PropTypes.shape({}).isRequired,
  numbers: PropTypes.shape({}).isRequired,
  tabIndex: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
}

export const TagPanel = ({
  label,
  suggestions,
  queryTag,
  onQueryTagChange,
  tags,
  onTagClick,
  handleAddTag,
}) => (
    <React.Fragment>
      <Typography
        variant="h6"
        style={{ color: '#919191', margin: '10px 0px 0px 20px', fontSize: '12px' }}
      >
        Frequently used tags:
      </Typography>
      <TagList tags={tags} onTagClick={tag => onTagClick(tag)} />
      <div className="c--home_textField">
        <Autocomplete
          label="Tags"
          suggestions={suggestions}
          inputValue={queryTag}
          onInputValueChange={e => onQueryTagChange(e.target.value)}
          onSelect={value => onQueryTagChange(value)}
          onAdd={handleAddTag}
        />
        <CustomizedButton
          label={label}
          onClick={handleAddTag}
          componentName="Add"
        />
      </div>
    </React.Fragment>
  )

TagPanel.propTypes = {
  label: PropTypes.string,
  queryTag: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onQueryTagChange: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTagClick: PropTypes.func.isRequired,
  handleAddTag: PropTypes.func.isRequired,
}

TagPanel.defaultProps = {
  label: 'ADD',
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
