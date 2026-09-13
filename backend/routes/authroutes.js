import express from "express";
import { loginStudent,
        registerStudent,
        getCurrentStudent,
        updateCurrentStudent
 } from "../controllers/authcontroller.js";

 import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.get("/me", protect, getCurrentStudent);
router.put("/me", protect, updateCurrentStudent);

export default router;