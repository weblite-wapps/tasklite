// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// helpers
// import { filteredTags } from './App.helper'


const getTasks = state => state.App.tasks
// const getUsers = state => state.Add.queryUser

// const getFilteredTasks = createSelector(
//   [getTasks, getAssignee, getFilterTags],
//   (tasks, queryAssignee, selectedTags) => R.compose(
//     R.filter(task => filteredTags(selectedTags, task.tags)),
//     R.filter(task => task.assignee.toLowerCase().includes(queryAssignee.toLowerCase())),
//   )(tasks),
// )

export const getNumberOfTasksInEachLevel = createSelector(
  [getTasks],
  (tasks) => {
    const groupedTasks = R.compose(R.groupBy(R.prop('level')))(tasks)
    return ({
      ICEBOX: R.length(groupedTasks['ICE BOX']) || 0,
      INPROGRESS: R.length(groupedTasks['IN PROGRESS']) || 0,
      EVALUTE: R.length(groupedTasks.EVALUTE) || 0,
      DONE: R.length(groupedTasks.DONE) || 0,
    })
  },
)

export const nothing = null
