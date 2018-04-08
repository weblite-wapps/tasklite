// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// selectors
import { getFilteredTasks } from '../components/Filter/Filter.selector'
// helpers
import { formattedDate } from '../../helper/functions/time.helper'


export const getNumberOfTasksInEachLevel = createSelector(
  [getFilteredTasks],
  (tasks) => {
    const groupedTasks = R.compose(R.groupBy(R.prop('level')))(tasks)
    return ({
      'ICE BOX': R.length(groupedTasks['ICE BOX']) || 0,
      'IN PROGRESS': R.length(groupedTasks['IN PROGRESS']) || 0,
      EVALUATE: R.length(groupedTasks.EVALUATE) || 0,
      DONE: R.length(groupedTasks.DONE) || 0,
    })
  },
)


const getSortByDeadline = state => state.AppBar.sortByDeadline

export const getSortedTasks = createSelector(
  [getFilteredTasks, getSortByDeadline],
  (tasks, sortByDeadline) => R.compose(
    R.sortWith([
      sortByDeadline ? R.ascend(R.prop('deadline')) : R.ascend(R.prop('priority')),
    ]),
    R.map(task => ({ ...task, deadline: formattedDate(task.deadline) })),
  )(tasks),
)
