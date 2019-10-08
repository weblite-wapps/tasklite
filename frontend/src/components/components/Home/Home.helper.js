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

export const updateTasksInFront = (
  source,
  destination,
  desOrder,
  initialOrder,
) => {
  const allTasks = tasksView()
  const srcInPage = R.prop('index', source)
  const destInPage = R.prop('index', destination)
  const sourceTasks = R.filter(
    task => R.prop('level', task) === R.prop('droppableId', source),
    tasksView(),
  )
  const destTasks = R.filter(
    task => R.prop('level', task) === R.prop('droppableId', destination),
    tasksView(),
  )
  const srcInList = R.findIndex(
    R.propEq('_id', R.prop('_id', R.nth(srcInPage, sourceTasks))),
  )(allTasks)

  const destInList = R.findIndex(
    R.propEq('_id', R.prop('_id', R.nth(destInPage, destTasks))),
    allTasks,
  )
  // console.log('alltasks ', allTasks)
  // console.log(srcInList, destInList, destTasks)

  return
}

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

  // console.log
  const task = R.nth(R.prop('index', source), sourceTasks)
  const sourceId = R.prop('_id', task)

  const destinationId = R.prop(
    '_id',
    R.nth(R.prop('index', destination), destTasks),
  )
  console.log('destinationId ', destinationId)

  const destRowIndex = R.prop('index', destination)

  let desOrder =
    destRowIndex === R.length(destTasks) && destTasks.length
      ? R.prop('order', R.nth(destRowIndex, destTasks)) - 1024
      : !destRowIndex && destTasks.length
      ? R.prop('order', R.nth(destRowIndex, destTasks)) + 1024
      : !destTasks.length
      ? R.prop('order', task)
      : (R.prop('order', R.nth(destRowIndex, destTasks)) +
          R.prop('order', R.nth(destRowIndex, destTasks) - 1)) /
        2
  console.log('desOrder ', desOrder)
  // .do(console.log)
  const prevLevel = getLevel(sourceId)

  return {
    source,
    destination,
    desOrder,
    task,
    sourceId,
    prevLevel,
    allTasks: tasksView(),
    orderedTasks: R.move(
      srcInList,
      destInList,
      R.adjust(
        srcInList,
        R.compose(
          R.assoc('level', R.prop('droppableId', destination)),
          R.assoc('order', desOrder ? desOrder : initialOrder),
        ),
        allTasks,
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
