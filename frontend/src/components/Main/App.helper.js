// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import {
  wisView,
  numbersObjectView,
  tasksView,
} from './App.reducer'

export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(new Date(), R.slice(6, 8, time)),
      R.slice(3, 5, time),
    ),
    R.slice(0, 2, time),
  )

export const getQuery = () => ({ wis: wisView() })

export const getUpdatedNumbersObject = (currentLevel, nextLevel) =>
  R.evolve({ [currentLevel]: R.dec, [nextLevel]: R.inc }, numbersObjectView())

export const getLevel = _id =>
  R.compose(
    R.prop('level'),
    R.find(R.propEq('_id', _id)),
  )(tasksView())

export const mapToUsername = users => R.map(user => user.name, users)