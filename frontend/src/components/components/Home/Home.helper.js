// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import {
  numbersObjectView,
  tasksView,
  tabIndexView,
} from './Home.reducer'

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

export const updateTasksInFront = (source, destination) => {
  const allTasks = tasksView()
  const srcInPage = R.prop('index', source)
  const destInPage = R.prop('index', destination)
  const pageTasks = R.filter(
    task => R.prop('level', task) === tabIndexView(),
    tasksView(),
  )
  const srcInList = R.findIndex(
    R.propEq('_id', R.prop('_id', R.nth(srcInPage, pageTasks))),
  )(allTasks)
  const destInList = R.findIndex(
    R.propEq('_id', R.prop('_id', R.nth(destInPage, pageTasks))),
    allTasks,
  )
  return R.move(srcInList, destInList, allTasks)
}

export const updateTodosInFront = (source, destination, task) => {
  const todos = R.prop('todos', task)
  return {
    ...task,
    todos: R.move(source, destination, todos),
  }
}
