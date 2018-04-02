// modules
import { createSelector } from 'reselect'
import * as R from 'ramda'
// selectors
import { getFilteredTasks } from '../Filter/Filter.selector'
// helpers
import { formattedDate } from '../../../helper/functions/date.helper'


const getSortByDeadline = state => state.Sort.sortByDeadline
const getSortByPriority = state => state.Sort.sortByPriority

export const getSortedTasks = createSelector(
  [getFilteredTasks, getSortByDeadline, getSortByPriority],
  (tasks, sortByDeadline, sortByPriority) => R.compose(
    R.sortWith([
      sortByPriority === 'descending' ? R.descend(R.prop('priority')) : R.ascend(R.prop('priority')),
      sortByDeadline === 'descending' ? R.descend(R.prop('deadline')) : R.ascend(R.prop('deadline')),
    ]),
    R.map(task => ({ ...task, deadline: formattedDate(task.deadline) })),
  )(tasks),
)

export const nothing = null
