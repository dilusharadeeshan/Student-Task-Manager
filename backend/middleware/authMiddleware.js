import jwt from "jsonwebtoken";

import Student from "../models/student.js";
import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/appError.js";

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Not authorized, token required", 401);
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const student = await Student.findById(decoded.studentId);

  if (!student) {
    throw new AppError("Student not found", 401);
  }

  req.student = student;

  next();
});

export default protect;