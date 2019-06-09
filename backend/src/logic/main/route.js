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
  ])
  .then(success => res.json({
    tasks: R.unnest([success[0], success[1], success[2], success[3]]),
    tags: success[4],
    numberOfTasks: {
      'ICE BOX': success[0].length,
      'IN PROGRESS': success[1].length,
      EVALUATE: success[2].length,
      DONE: success[3].length,
    },
  }))
  .catch(logger))