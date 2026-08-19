import express from "express";
import Student from "../models/student.js";

const router = express.Router();


router.post("/", async (req, res) => {
 try{
  const student = await Student.create(req.body);

  res.status(201).json(student);
  }catch(error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);    
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


router.put("/:id", async (req, res) => {
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
});

export default router;

