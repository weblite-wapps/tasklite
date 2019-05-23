// modules
import * as R from 'ramda'
// components
import app from '../../setup/server'
import '../components/user/route'
import '../components/task/route'
import '../components/tag/route'
// db helpers
import {
  fetchTasks,
  fetchTags,
  countTasks
} from './db'
// const
const logger = console.log


app.get('/initialFetch', ({
    query
  }, res) =>
  Promise.all([
    fetchTasks({
      ...query,
      level: 'ICE BOX'
    }),
    fetchTasks({
      ...query,
      level: 'IN PROGRESS'
    }),
    fetchTasks({
      ...query,
      level: 'EVALUATE'
    }),
    fetchTasks({
      ...query,
      level: 'DONE'
    }),
    fetchTags(query),
    countTasks({
      ...query,
      level: 'ICE BOX'
    }),
    countTasks({
      ...query,
      level: 'IN PROGRESS'
    }),
    countTasks({
      ...query,
      level: 'EVALUATE'
    }),
    countTasks({
      ...query,
      level: 'DONE'
    }),
  ])
  .then(success => res.json({
    tasks: R.unnest([success[0], success[1], success[2], success[3]]),
    tags: success[4],
    numberOfTasks: {
      'ICE BOX': success[5],
      'IN PROGRESS': success[6],
      EVALUATE: success[7],
      DONE: success[8],
    },
  }))
  .catch(logger))