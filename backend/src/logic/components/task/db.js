// models
import Task from '../../../models/task'


export const fetchTasks = async ({ query, skipLength }) => Task
  .find(query)
  .sort({ deadline: 1 })
  .limit(5)
  .skip(Number(skipLength))
  .exec()

export const saveTask = async task => new Task(task)
  .save()

export const updateTask = async (query, updateObject) => Task
  .update(query, updateObject)
  .exec()

export const deleteTask = async query => Task
  .remove(query)
  .exec()
