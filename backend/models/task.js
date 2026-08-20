import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"],
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  student: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Student",
  required: true
}
},
{
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;