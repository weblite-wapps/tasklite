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
  Promise.all([fetchTasks(query), fetchTags(query)])
    .then(success => res.json({ tasks: R.reverse(success[0]), tags: success[1] }))
    .catch(logger))
