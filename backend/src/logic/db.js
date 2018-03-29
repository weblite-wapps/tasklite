// modules
// import format from 'date-fns/format'
// models
import User from '../models/user'
import Task from '../models/task'
import Tag from '../models/tag'


export const fetchUsers = async query => User
  .find(query)
  .sort({ name: 1 })
  .exec()

export const fetchTasks = async query => Task
  .find(query)
  .exec()

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .exec()

export const saveUser = async user => new User(user)
  .save()

export const saveTask = async task => new Task(task)
  .save()

export const saveTag = async tag => new Tag(tag)
  .save()

export const countUser = async query => User
  .find(query)
  .count()
  .exec()

export const countTags = async query => Tag
  .find(query)
  .count()
  .exec()

export const updateTag = async (query, updateObject) => Tag
  .update(query, updateObject)
  .exec()

export const updateTask = async (query, updateObject) => Task
  .update(query, updateObject)
  .exec()

export const deleteTask = async query => Task
  .remove(query)
  .exec()
