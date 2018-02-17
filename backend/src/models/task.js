// module
import mongoose from 'mongoose'

const { Schema } = mongoose

const TaskSchema = new Schema({
  title: String,
  tags: [String],
  priority: String,
  todos: [{
    title: Date,
    completed: Boolean,
  }],
  assigneeId: String,
  assignerId: String,
  wis: String,
})

export default mongoose.model('Task', TaskSchema)
