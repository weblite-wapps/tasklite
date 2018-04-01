// modules
import * as R from 'ramda'
// components
import app from '../../setup/server'
import '../components/user/route'
import '../components/task/route'
import '../components/tag/route'
// db helpers
import { fetchTasks, fetchTags } from './db'
// const
const logger = console.log


app.get('/initialFetch', ({ query }, res) =>
  Promise.all([
    fetchTasks({ ...query, level: 'ICE BOX' }),
    fetchTasks({ ...query, level: 'IN PROGRESS' }),
    fetchTasks({ ...query, level: 'EVALUTE' }),
    fetchTasks({ ...query, level: 'DONE' }),
    fetchTags(query),
  ])
    .then(success => res.json({
      tasks: R.unnest([success[0], success[1], success[2], success[3]]),
      tags: success[4],
    }))
    .catch(logger))
