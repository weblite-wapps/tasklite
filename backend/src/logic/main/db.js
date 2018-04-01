// models
import Task from '../../models/task'
import Tag from '../../models/tag'
// helpers
import { getLimit } from './helper'

export const fetchTasks = async query => Task
  .find(query)
  .sort({ deadline: 1 })
  .limit(getLimit(query.level))
  .exec()

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(5)
  .exec()
