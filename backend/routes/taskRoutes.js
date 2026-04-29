import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   CREATE TASK
========================= */
router.post("/", protect, async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,

      // 🔥 MUST EXIST
      startDate: req.body.startDate,
      dueDate: req.body.dueDate || null,
      repeat: req.body.repeat,
      isRoutine: req.body.isRoutine,
      role: req.body.role,

      priority: req.body.priority || "Medium",

      user: req.user._id,
      status: "Pending",
    });

    res.status(201).json(task);
  } catch (err) {
    console.log("SERVER ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
});
/* =========================
   GET TASKS (USER ONLY)
========================= */
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   UPDATE TASK
========================= */
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   DELETE TASK
========================= */
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;