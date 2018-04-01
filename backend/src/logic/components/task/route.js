// modules
import mongoose from 'mongoose'
import * as R from 'ramda'
// components
import app from '../../../setup/server'
// db helpers
import { fetchTasks, saveTask, updateTask, deleteTask } from './db'
// helpers
import { getToggledValue } from './helper'
// const
const logger = console.log


app.get('/fetchTasks', ({ query: { wis, userId, date } }, res) =>
  fetchTasks({ wis, userId, date })
    .then(tasks => res.json(R.reverse(tasks)))
    .catch(logger))

app.post('/saveTask', (req, res) =>
  saveTask(req.body)
    .then(task => res.send(task))
    .catch(logger))

app.post('/deleteTask', (req, res) =>
  deleteTask({ _id: mongoose.Types.ObjectId(req.query._id) })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))

app.post('/changeLevel', ({ body }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(body._id) }, { $set: { level: body.nextLevel } })
    .then(() => res.send(body))
    .catch(logger))

app.post('/setSentTime', ({ body: { _id, sentTime } }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(_id) }, { $set: { sentTime } })
    .then(() => res.send('sent time set!'))
    .catch(logger))

app.post('/toggleTodo', ({ body: { _id, todoId, task } }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(_id), 'todos._id': todoId },
    { $set: { 'todos.$.completed': getToggledValue(task, todoId) } })
    .then(() => res.send('toggled successfully!'))
    .catch(logger))

app.post('/addTodo', ({ body }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(body._id) },
    { $push: { todos: { $each: [{ title: body.value, completed: false }], $position: 0 } } })
    .then(() => fetchTasks({ _id: mongoose.Types.ObjectId(body._id) }))
    .then(task => res.send(task))
    .catch(logger))

app.post('/deleteTodo', ({ body: { _id, todoId } }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(_id) }, { $pull: { todos: { _id: todoId } } })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))
