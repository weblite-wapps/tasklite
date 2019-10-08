// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import { numbersObjectView, tasksView, tabIndexView } from './Home.reducer'

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
  desSiblingOrder,
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

  return R.move(
    srcInList,
    destInList,
    R.adjust(
      srcInList,
      R.compose(
        R.assoc('level', R.prop('droppableId', destination)),
        R.assoc(
          'order',
          desOrder ? (desOrder + desSiblingOrder) / 2 : initialOrder,
        ),
      ),
      allTasks,
    ),
  )
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

  const sourceId = R.prop('_id', R.nth(R.prop('index', source), sourceTasks))
  const task = R.nth(R.prop('index', source), sourceTasks)
  const destinationId = R.prop(
    '_id',
    R.nth(R.prop('index', destination), destTasks),
  )
  const allTasks = tasksView()
  // .do(console.log)

  let desOrder = R.prop(
    'order',
    R.find(R.propEq('_id', destinationId), allTasks),
  )
  const sourceIndex = R.findIndex(R.propEq('_id', sourceId), allTasks)
  const destinationIndex = R.findIndex(R.propEq('_id', destinationId), allTasks)

  // .do(console.log)
  let desSiblingOrder =
    destinationIndex + 1 === R.length(allTasks)
      ? desOrder - 100
      : !destinationIndex
      ? desOrder + 100
      : R.prop(
          'order',
          R.nth(
            destinationIndex > sourceIndex
              ? destinationIndex + 1
              : destinationIndex - 1,
            allTasks,
          ),
        )
  const prevLevel = getLevel(sourceId)

  // console.log

  desOrder = desOrder || R.prop('order', task)
  desSiblingOrder = desOrder ? desSiblingOrder : R.prop('order', task)
  return {
    source,
    destination,
    desOrder,
    desSiblingOrder,
    task,
    sourceId,
    prevLevel,
    allTasks,
  }
}
