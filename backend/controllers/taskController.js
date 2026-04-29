import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      repeat: req.body.repeat,
      isRoutine: req.body.isRoutine,
      role: req.body.role,

      // 🔥 FORCE SAFE DATE (NO MORE undefined)
      startDate: req.body.startDate
        ? new Date(req.body.startDate)
        : new Date(),

      dueDate: req.body.dueDate
        ? new Date(req.body.dueDate)
        : undefined,

      user: req.user._id,
    });


    res.status(201).json(task);
  } catch (error) {
    console.log("CREATE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// GET TASKS
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// mark complete
export const completeTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { completed: true, status: "Completed" },
      { new: true }
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};