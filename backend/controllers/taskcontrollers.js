import Task from "../models/task.js";
import Student from "../models/student.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";

export const createTask = asyncHandler(async (req, res) => {

   const task = await Task.create({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
    student: req.student._id
  });

  res.status(201).json(task);
});

export const getTasks = asyncHandler(async (req, res) => {
    const filter = {student: req.student._id};

   
    let sortOption = { createdAt: -1 };

  if (req.query.sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

 const page = req.query.page
  ? Number(req.query.page)
  : 1;

const limit = req.query.limit
  ? Number(req.query.limit)
  : 5;

  if (!Number.isInteger(page) || page < 1) {
  throw new AppError(
    "Page must be a positive integer",
    400
  );
}

if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
  throw new AppError(
    "Limit must be between 1 and 100",
    400
  );
}

  if (page < 1) {
  throw new AppError("Page must be greater than 0", 400);
}

if (limit < 1) {
  throw new AppError("Limit must be greater than 0", 400);
}

if (limit > 100) {
  throw new AppError("Limit cannot be greater than 100", 400);
}

  const skip = (page - 1) * limit;


  const tasks = await Task.find(filter).sort(sortOption).skip(skip).limit(limit).populate("student", "name email");

  const totalTasks = await Task.countDocuments(filter);
  const totalPages = Math.ceil(totalTasks / limit);



  res.status(200).json({
    tasks,
    pagination: {
      currentPage: page,
       limit,
    totalTasks,
    totalPages
  }
  });
});


export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    student: req.student._id
  }).populate("student", "name email");

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  res.status(200).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      student: req.student._id
    },
    {
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed
    },
    {
      new: true,
      runValidators: true
    }
  ).populate("student", "name email");

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

