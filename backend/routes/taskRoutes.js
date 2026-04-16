import express from "express";
import {
  createTask,
  getTasks,
  assignTask,
  completeTask,
  rescheduleTask
} from "../controllers/taskController.js";


const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:taskId/assign",assignTask);
router.put("/:taskId/complete", completeTask);
router.put("/:taskId/reschedule", rescheduleTask);

export default router;