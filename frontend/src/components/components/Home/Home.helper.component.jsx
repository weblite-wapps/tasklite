// modules
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import FlipMove from 'react-flip-move'
import MuiCollapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import Typography from '@material-ui/core/Typography'
// components
import CustomizedTaskList from '../List/main/List.container.react'
import Autocomplete from '../../../helper/components/Autocomplete/Autocomplete.presentational'
import CustomizedButton from '../../../helper/components/Button/Button.presentational'
import TagList from '../../../helper/components/TagList/TagList.presentational'
// styles
import './Home.scss'
import { wappModeView } from './Home.reducer'

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

// TODO: WRITE DRAG COMPONENTS WITH HOC
class DroppableItemTask extends Component {
  render() {
    const { task, provided, forwardedRef, tabIndex } = this.props
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={forwardedRef}
        {...provided.draggableProps}
      >
        <CustomizedTaskList
          task={task}
          provided={provided}
          tabIndex={tabIndex}
        />
      </div>
    )
  }
}

const ForwardedDroppableItemTask = React.forwardRef((props, ref) => (
  <DroppableItemTask {...props} forwardedRef={ref} />
))

class DroppableItem extends Component {
  render() {
    const {
      tasks,
      tabIndex,
      isLoading,
      forwardedRef,
      assignee,
      selectedTags,
      wappMode,
    } = this.props
    return (
      <div style={{ width: '100%', height: '100%' }} ref={forwardedRef}>
        {/* <FlipMove
          typeName={null}
          duration={500}
          staggerDelayBy={150}
          enterAnimation="elevator"
          leaveAnimation={false}
        > */}
        {/* <LevelIcon src="icons/icebox.png" label="ICE BOX" /> */}
        {wappMode === 'fullscreen' && (
          <div className="c--levelBar_textContainer">
            <Divider />
            <Typography variant="h6">{tabIndex}</Typography>
            <Divider />
          </div>
        )}
        {tasks
          .filter(task => task.level === tabIndex)
          .map((task, index) => (
            <Draggable
              key={task._id}
              isDragDisabled={
                isLoading || !!assignee.name || !!selectedTags.length
              }
              draggableId={task._id}
              index={index}
            >
              {provided => (
                <ForwardedDroppableItemTask
                  ref={provided.innerRef}
                  task={task}
                  provided={provided}
                  tabIndex={tabIndex}
                />
              )}
            </Draggable>
          ))}
        {/* </FlipMove> */}
      </div>
    )
  }
}

DroppableItem.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabIndex: PropTypes.string.isRequired,
}

const ForwardedDroppableItem = React.forwardRef((props, ref) => (
  <DroppableItem {...props} forwardedRef={ref} />
))

export class TaskList extends Component {
  constructor(props) {
    super(props)
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(e) {
    const { dragTask } = this.props
    dragTask(e)
  }

  render() {
    const { ...props } = this.props
    return (
      <>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              height: '100vh',
            }}
          >
            <Droppable droppableId={'ICE BOX'}>
              {provided => (
                <div
                  style={{
                    width: wappModeView() === 'fullscreen' ? '25%' : '100%',
                    height: '100%',
                  }}
                >
                  <ForwardedDroppableItem
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    {...props}
                    tabIndex={
                      wappModeView() === 'fullscreen'
                        ? 'ICE BOX'
                        : this.props.tabIndex
                    }
                    ref={provided.innerRef}
                  />
                </div>
              )}
            </Droppable>
            {wappModeView() === 'fullscreen' && (
              <div
                style={{ width: '75%', display: 'flex', flexDirection: 'row' }}
              >
                <Droppable droppableId="IN PROGRESS">
                  {provided => (
                    <div style={{ width: '33%', height: '100%' }}>
                      <ForwardedDroppableItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}
                        tabIndex={
                          wappModeView() === 'fullscreen'
                            ? 'IN PROGRESS'
                            : this.props.tabIndex
                        }
                        ref={provided.innerRef}
                      />
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="EVALUATE">
                  {provided => (
                    <div style={{ width: '33%', height: '100%' }}>
                      <ForwardedDroppableItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}
                        tabIndex={
                          wappModeView() === 'fullscreen'
                            ? 'EVALUATE'
                            : this.props.tabIndex
                        }
                        ref={provided.innerRef}
                      />
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="DONE">
                  {provided => (
                    <div style={{ width: '33%', height: '100%' }}>
                      <ForwardedDroppableItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...props}
                        tabIndex={
                          wappModeView() === 'fullscreen'
                            ? 'DONE'
                            : this.props.tabIndex
                        }
                        ref={provided.innerRef}
                      />
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </div>
        </DragDropContext>
      </>
    )
  }
}

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
      style={{
        color: '#919191',
        margin: '10px 0px 0px 20px',
        fontSize: '12px',
      }}
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
