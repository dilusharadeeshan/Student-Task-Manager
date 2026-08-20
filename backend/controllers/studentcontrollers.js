import Student from "../models/student.js";

//create student
export const createStudent =async (req, res) => {
 try{
  const student = await Student.create(req.body);

  res.status(201).json(student);
  }catch(error) {
    res.status(500).json(error);
  }
};

//get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//get student by id
export const getStudentById =async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);    
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//update student
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

//delete student
export const deleteStudent =  async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully",
      student
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



