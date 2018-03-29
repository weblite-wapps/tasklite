// modules
import mongoose from 'mongoose'
import * as R from 'ramda'
// components
import app from '../setup/server'
// db helpers
import {
  fetchUsers,
  fetchTasks,
  fetchTags,
  saveUser,
  saveTask,
  countUser,
  countTags,
  saveTag,
  updateTag,
  updateTask,
  deleteTask,
} from './db'
// helpers
import { getToggledValue } from './helper'
// const
const logger = console.log


app.get('/initialFetch', ({ query }, res) =>
  Promise.all([fetchTasks(query), fetchTags(query)])
    .then(success => res.json({ tasks: R.reverse(success[0]), tags: success[1] }))
    .catch(logger))


app.get('/fetchUsers', (req, res) =>
  fetchUsers({ wis: req.query.wis })
    .then(users => res.json(users))
    .catch(logger))


app.get('/fetchTasks', ({ query: { wis, userId, date } }, res) =>
  fetchTasks({ wis, userId, date })
    .then(tasks => res.json(R.reverse(tasks)))
    .catch(logger))


app.get('/fetchTags', ({ query: { wis, userId } }, res) =>
  fetchTags({ wis, userId })
    .then(tags => res.json(tags))
    .catch(logger))


app.get('/serachTags', ({ query: { wis, userId, label } }, res) =>
  fetchTags({ wis, userId, label: { $regex: `.*${label}.*` } })
    .then(tags => res.json(tags))
    .catch(logger))


app.post('/saveUser', ({ body: { wis, userId, username } }, res) => {
  countUser({ wis, id: userId }).then((number) => {
    if (number === 0) {
      saveUser({ wis, name: username, id: userId })
        .then(user => res.json(user))
        .catch(logger)
    } else res.send('user was saved before!')
  })
})


app.post('/saveTask', (req, res) =>
  saveTask(req.body)
    .then(task => res.send(task))
    .catch(logger))


app.post('/saveTags', ({ body: { wis, userId, tags } }, res) => {
  const addOrUpdateTag = tag =>
    countTags({ wis, userId, label: tag })
      .then((number) => {
        if (number === 0) {
          saveTag({ label: tag, number: 1, userId, wis })
        } else updateTag({ label: tag }, { $inc: { number: 1 } })
      })
  R.forEach(addOrUpdateTag, tags)
  fetchTags({ wis, userId })
    .then(kinds => res.json(kinds))
    .catch(logger)
})


app.post('/deleteTask', (req, res) =>
  deleteTask({ _id: mongoose.Types.ObjectId(req.query._id) })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))


app.post('/changeLevel', ({ body }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(body._id) }, { $set: { nextLevel: body.nextLevel } })
    .then(() => res.send(body))
    .catch(logger))


app.post('/toggleTodo', ({ body: { _id, todoId, task } }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(_id), 'todos._id': todoId }, { $set: { 'todos.$.completed': getToggledValue(task, todoId) } })
    .then(() => res.send('toggled successfully!'))
    .catch(logger))


app.post('/addTodo', ({ body }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(body._id) }, { $push: { todos: { $each: [{ title: body.value, completed: false }], $position: 0 } } })
    .then(() => fetchTasks({ _id: mongoose.Types.ObjectId(body._id) }))
    .then(task => res.send(task))
    .catch(logger))


app.post('/deleteTodo', ({ body: { _id, todoId } }, res) =>
  updateTask({ _id: mongoose.Types.ObjectId(_id) }, { $pull: { todos: { _id: todoId } } })
    .then(() => res.send('deleted successfully!'))
    .catch(logger))
