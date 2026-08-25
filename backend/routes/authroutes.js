import express from "express";
import { loginStudent } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/login", loginStudent);

export default router;