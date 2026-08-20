import Student from "../models/student.js";
import asyncHandler from "../middleware/asyncHandler.js";

//create student
export const createStudent = asyncHandler(async (req, res) => {
 
  const student = await Student.create(req.body);

  res.status(201).json(student);
 
});

//get all students
export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find();

  res.status(200).json(students);
});

//get student by id
export const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);


   if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.status(200).json(student);
});


//update student
export const updateStudent =asyncHandler( async (req, res, next) => {
  
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
 if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

    res.status(200).json(student);
  
});

//delete student
export const deleteStudent =  asyncHandler( async (req, res) => {

    const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }
    res.status(200).json({
      message: "Student deleted successfully",
      student
    });
});



