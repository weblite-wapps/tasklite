// module
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema({
  id: String,
  name: String,
  wis: String,
})

export default mongoose.model('User', UserSchema)
