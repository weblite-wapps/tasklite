// modules
import mongoose from 'mongoose'
// components
import app from '../../../setup/server'
// db helpers
import {
  loadMoreFetchTasks,
  fetchTasks,
  saveTask,
  updateTask,
  deleteTask,
  fetchSingleTask,
} from './db'
// helpers
import { getToggledValue, calcNewIndexInDb } from './helper'
import task from '../../../models/task'
// const
const logger = console.log

app.post('/saveTask', (req, res) =>
  saveTask(req.body)
    .then(task => res.send(task))
    .catch(logger),
)

app.post('/deleteTask', (req, res) =>
  deleteTask({
    _id: mongoose.Types.ObjectId(req.query._id),
  })
    .then(() => res.send('deleted successfully!'))
    .catch(logger),
)

app.post('/changeLevel', ({ body }, res) =>
  updateTask(
    {
      _id: mongoose.Types.ObjectId(body._id),
    },
    {
      $set: {
        level: body.nextLevel,
      },
    },
    {},
  )
    .then(() => res.send(body))
    .catch(logger),
)

app.post('/setSentTime', ({ body: { _id, sentTime } }, res) =>
  updateTask(
    {
      _id: mongoose.Types.ObjectId(_id),
    },
    {
      $set: {
        sentTime,
      },
    },
    {},
  )
    .then(() => res.send('sent time set!'))
    .catch(logger),
)

app.post('/toggleTodo', ({ body: { _id, todoId, task } }, res) =>
  updateTask(
    {
      _id: mongoose.Types.ObjectId(_id),
      'todos._id': todoId,
    },
    {
      $set: {
        'todos.$.completed': getToggledValue(task, todoId),
      },
    },
    {},
  )
    .then(() => res.send('toggled successfully!'))
    .catch(logger),
)

app.post('/addTodo', ({ body: { _id, value, order } }, res) =>
  updateTask(
    {
      _id: mongoose.Types.ObjectId(_id),
    },
    {
      $push: {
        todos: {
          $each: [
            {
              title: value,
              order,
              completed: false,
            },
          ],
          $position: 0,
        },
      },
    },
    {},
  )
    .then(() =>
      fetchTasks({
        _id: mongoose.Types.ObjectId(_id),
      }),
    )
    .then(task => res.send(task))
    .catch(logger),
)

app.post('/deleteTodo', ({ body: { _id, todoId } }, res) =>
  updateTask(
    {
      _id: mongoose.Types.ObjectId(_id),
    },
    {
      $pull: {
        todos: {
          _id: todoId,
        },
      },
    },
    {},
  )
    .then(() => res.send('deleted successfully!'))
    .catch(logger),
)

app.get('/loadMore', ({ query }, res) =>
  loadMoreFetchTasks(query)
    .then(tasks => res.json(tasks))
    .catch(logger),
)

app.post('/editTask', ({ body, body: { _id } }, res) =>
  updateTask(
    {
      _id,
    },
    body,
    {},
  )
    .then(() => res.send('edited successfully!'))
    .catch(logger),
)

app.post(
  '/dragTask',
  ({ body: { sourceId, desOrder, desSiblingOrder } }, res) => {
    console.log()
    return updateTask(
      {
        _id: sourceId,
      },
      {
        order: calcNewIndexInDb(desOrder, desSiblingOrder),
      },
      {
        new: true,
      },
    )
      .then(data => res.send(data))
      .catch(console.log)
  },
)

app.post('/dragTodo', ({ body: { sourceTaskId, todos } }, res) =>
  // console.log(sourceId, destOrder, destSiblingOrder, sourceTaskId)
  updateTask(
    {
      _id: sourceTaskId,
    },
    { todos },
  )
    .then(() => res.send('Dragged succesfully'))
    .catch(console.log),
)