// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import { numbersObjectView, tasksView, tabIndexView } from './Home.reducer'
import { dispatchChangeSnackbarStage } from '../Snackbar/Snackbar.action'

export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(new Date(), R.slice(6, 8, time)),
      R.slice(3, 5, time),
    ),
    R.slice(0, 2, time),
  )

export const getUpdatedNumbersObject = (currentLevel, nextLevel) =>
  R.evolve(
    {
      [currentLevel]: R.dec,
      [nextLevel]: R.inc,
    },
    numbersObjectView(),
  )

export const getLevel = _id =>
  R.compose(
    R.prop('level'),
    R.find(R.propEq('_id', _id)),
  )(tasksView())

export const mapToUsername = users => R.map(user => user.name, users)

export const updateTodosInFront = (source, destination, task) => {
  const todos = R.prop('todos', task)
  return {
    ...task,
    todos: R.move(source, destination, todos),
  }
}

export const mapToDragDatas = ({ source, destination }) => {
  const destTasks = R.filter(
    task => R.prop('level', task) === R.prop('droppableId', destination),
    tasksView(),
  )
  const sourceTasks = R.filter(
    task => R.prop('level', task) === R.prop('droppableId', source),
    tasksView(),
  )

  const task = R.nth(R.prop('index', source), sourceTasks)
  const sourceId = R.prop('_id', task)

  const srcIndexInList = R.findIndex(
    R.propEq('_id', R.prop('_id', R.nth(R.prop('index', source), sourceTasks))),
  )(tasksView())

  const destinationId = R.prop(
    '_id',
    R.nth(R.prop('index', destination), destTasks),
  )

  const srcRowIndex = R.prop('index', source)
  const destRowIndex = R.prop('index', destination)

  const destIndexInList = R.findIndex(
    R.propEq(
      '_id',
      R.prop('_id', R.nth(R.prop('index', destination), destTasks)),
    ),
    tasksView(),
  )

  const prevLevel = getLevel(sourceId)

  const sibling =
    prevLevel === R.prop('droppableId', destination) &&
    destRowIndex > srcRowIndex
      ? +1
      : -1

  const desOrder =
    destRowIndex === R.length(destTasks) && destTasks.length
      ? R.prop('order', R.nth(destRowIndex - 1, destTasks)) - 1024
      : !destRowIndex && destTasks.length
      ? R.prop('order', R.nth(destRowIndex, destTasks)) + 1024
      : !destTasks.length
      ? R.prop('order', task)
      : (R.prop('order', R.nth(destRowIndex, destTasks)) +
          R.prop('order', R.nth(destRowIndex + sibling, destTasks))) /
        2

  return {
    source,
    destination,
    desOrder,
    task,
    sourceId,
    prevLevel,
    allTasks: tasksView(),
    orderedTasks: R.sort(
      (a, b) => b.order - a.order,
      R.adjust(
        srcIndexInList,
        R.compose(
          R.assoc('level', R.prop('droppableId', destination)),
          R.assoc('order', desOrder ? desOrder : R.prop('order', task)),
        ),
        tasksView(),
      ),
    ),
  }
}

export const checkBeforeDragTask = ({ destination }) =>
  (destination && destination.index > -1) ||
  (() => {
    dispatchChangeSnackbarStage('Destination must be in task list zone')
    return false
  })()
