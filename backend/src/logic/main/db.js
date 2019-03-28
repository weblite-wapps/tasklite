// models
import Task from '../../models/task'
import Tag from '../../models/tag'
// helpers
import { getLimit } from './helper'


export const fetchTasks = async query => Task
  .find(query)
  .sort({ created_at: -1 })
  .limit(getLimit(query.level))
  .exec()

export const fetchTags = async query => Tag
  .find(query)
  .sort({ number: -1 })
  .limit(10)
  .exec()

export const countTasks = async query => Task
  .find(query)
  .count()
  .exec()
