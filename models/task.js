import mongoose, { Schema, model } from 'mongoose'

const TaskSchema = new Schema({
  name: {
    type: String,
    trim: true,      // To remove the white space from front.
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  }
})

export const Task = model('Task', TaskSchema);
  