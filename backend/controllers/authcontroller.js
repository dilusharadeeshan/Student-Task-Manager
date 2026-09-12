import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  const token = jwt.sign(
  {
    studentId: student._id
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

 res.status(200).json({
  message: "Login successful",
  token
});
});


export const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, age, password } = req.body;

  const existingStudent = await Student.findOne({ email });

  if (existingStudent) {
    throw new AppError("Email already exists", 409);
  }

  const student = await Student.create({
    name,
    email,
    age,
    password
  });

  
  const studentResponse = await Student.findById(student._id);

   const token = jwt.sign(
    {
      studentId: student._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );


  res.status(201).json({
    message: "Student registered successfully",
    student: studentResponse,
    token
  });
});


export const getCurrentStudent = asyncHandler(async (req, res) => {
  res.status(200).json({
    student: req.student
  });
});