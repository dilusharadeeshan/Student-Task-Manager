import Task from "../models/task.js";
import Student from "../models/student.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";

export const createTask = asyncHandler(async (req, res) => {

  const student = await Student.findById(req.body.student);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  const task = await Task.create(req.body);

  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
    const filter = {};

    if(req.query.student){
        filter.student = req.query.student;
    }

  const tasks = await Task.find(filter).populate("student");

  res.status(200).json(tasks);
});


export const getTaskById =asyncHandler(async (req,res)=> {
    const task = await Task.findById(req.params.id).populate("student");

    if (!task) {
        throw new AppError("Task not found", 404);
    }
    res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  ).populate("student");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.status(200).json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.status(200).json({
    message: "Task deleted successfully",
    task
  });
});

