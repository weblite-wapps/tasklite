// module
import mongoose from 'mongoose'


const {
  Schema
} = mongoose

const TaskSchema = new Schema({
  title: String,
  tags: [String],
  priority: String,
  deadline: Date,
  sentTime: Date,
  level: String,
  assignee: {
    name: String,
    id: String,
  },
  todos: [{
    title: String,
    completed: Boolean,
  }],
  indexInDb: Number,
  created_at: Date,
  userId: String,
  wis: String,
})

export default mongoose.model('Task', TaskSchema)