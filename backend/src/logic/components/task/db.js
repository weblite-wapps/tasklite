// models
import Task from '../../../models/task'

export const loadMoreFetchTasks = async ({ query, skipLength }) =>
  Task.find(query)
    .sort({
      deadline: 1,
    })
    .limit(5)
    .skip(Number(skipLength))
    .exec()

export const fetchTasks = async query => Task.find(query).exec()

export const fetchSingleTask = async query => Task.findOne(query).exec() 

export const saveTask = async task => new Task(task).save()

export const deleteTask = async query => Task.remove(query).exec()

export const updateTask = async (query, updateObject, updateOption) =>
  Task.findOneAndUpdate(query, updateObject, updateOption)
    .select({
      order: 1,
      _id: 1,
    })
    .exec()
