// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// selectors
import { getFilteredTasks } from '../Filter/Filter.selector'


export const getNumberOfTasksInEachLevel = createSelector(
  [getFilteredTasks],
  tasks => {
    const groupedTasks = R.compose(R.groupBy(R.prop('level')))(tasks)
    return {
      'ICE BOX': R.length(groupedTasks['ICE BOX']) || 0,
      'IN PROGRESS': R.length(groupedTasks['IN PROGRESS']) || 0,
      EVALUATE: R.length(groupedTasks.EVALUATE) || 0,
      DONE: R.length(groupedTasks.DONE) || 0,
    }
  },
)

export default null