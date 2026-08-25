import bcrypt from "bcrypt";

import Student from "../models/student.js";
import asyncHandler from "../middleware/asyncHandler.js";
import AppError from "../utils/appError.js";

export const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  const student = await Student.findOne({ email }).select("+password");

  if (!student) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    student.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  res.status(200).json({
    message: "Login successful"
  });
});