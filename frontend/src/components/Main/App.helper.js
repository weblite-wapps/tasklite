// modules
import * as R from 'ramda'
import { setHours, setMinutes, setSeconds } from 'date-fns'
// views
import { wisView, userIdView, creatorView } from './App.reducer'


export const formatTime = time =>
  setHours(
    setMinutes(
      setSeconds(
        new Date(), R.slice(6, 8, time)), R.slice(3, 5, time)), R.slice(0, 2, time))


export const filteredTags = (selectedTags, tags) =>
  R.reduce(R.and, true, R.map(tag => R.contains(tag, tags), selectedTags))


export const getQuery = () =>
  creatorView() ? { wis: wisView() } : { wis: wisView(), userId: userIdView() }
