import express from "express";
import { createQuiz, getAllQuizzes } from "../controllers/quizController.js";
import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
router.post("/create", authenticate, authorizeRoles("admin"), createQuiz);
router.get("/", authenticate, authorizeRoles("user", "admin"), getAllQuizzes);
export default router;
