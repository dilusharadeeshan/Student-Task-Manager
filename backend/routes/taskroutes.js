import express from "express";
import protect from "../middleware/authMiddleware.js";
import { createTask,
        getTasks,
        getTaskById,
        updateTask,
        deleteTask
 } from "../controllers/taskcontrollers.js";

const router = express.Router();

router.post("/", createTask);
router.get("/",protect, getTasks)
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


export default router;