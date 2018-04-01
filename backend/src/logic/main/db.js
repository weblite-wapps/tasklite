// models
import Task from '../../models/task'
import Tag from '../../models/tag'


export const fetchTasks = async query => Task
  .find(query)
  .exec()

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .exec()
