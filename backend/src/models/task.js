// module
import mongoose from 'mongoose'

const { Schema } = mongoose

const TaskSchema = new Schema({
  title: String,
  tags: [String],
  priority: String,
  deadline: Date,
  sentTime: Date,
  level: String,
  assigneeId: String,
  assigneeName: String,
  todos: [{
    title: String,
    completed: Boolean,
  }],
  wis: String,
})

export default mongoose.model('Task', TaskSchema)
