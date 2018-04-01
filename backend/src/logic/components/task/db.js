// models
import Task from '../../../models/task'


export const fetchTasks = async query => Task
  .find(query)
  .exec()

export const saveTask = async task => new Task(task)
  .save()

export const updateTask = async (query, updateObject) => Task
  .update(query, updateObject)
  .exec()

export const deleteTask = async query => Task
  .remove(query)
  .exec()
