// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import { wisView, userIdView, creatorView, numbersObjectView } from './App.reducer'


export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(
        new Date(), R.slice(6, 8, time)), R.slice(3, 5, time)), R.slice(0, 2, time))


export const getQuery = () =>
  creatorView() ? { wis: wisView() } : { wis: wisView(), userId: userIdView() }


export const getUpdatedNumbersObject = (currentLevel, nextLevel) =>
  R.evolve({ [currentLevel]: R.dec, [nextLevel]: R.inc }, numbersObjectView())
