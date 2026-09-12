import express from "express";
import { loginStudent,
        registerStudent
 } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);

export default router;