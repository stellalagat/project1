import Task from "../models/Task.js";


// ✅ CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      assignedTo,
      dueDateTime,
      priority,
      recurrence
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title,
      description,
      assignedTo,
      dueDateTime,
      priority,
      recurrence,
      createdBy: req.user.id,
      history: [{ action: "Task created", date: new Date() }]
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 📋 GET TASKS (for logged-in user)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id
    }).populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 👥 ASSIGN TASK
export const assignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { users } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.assignedTo = users;

    task.history.push({
      action: "Task assigned",
      date: new Date()
    });

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ COMPLETE TASK
export const completeTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.status = "completed";
    task.completedAt = new Date();

    task.history.push({
      action: "Task completed",
      date: new Date()
    });

    await task.save();

    // 🔁 HANDLE RECURRING TASK
    if (task.recurrence && task.recurrence !== "none") {
      let nextDate = new Date(task.dueDateTime);

      switch (task.recurrence) {
        case "daily":
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case "weekly":
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case "monthly":
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case "yearly":
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }

      await Task.create({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        createdBy: task.createdBy,
        dueDateTime: nextDate,
        priority: task.priority,
        recurrence: task.recurrence,
        status: "pending",
        history: [{ action: "Recurring task created", date: new Date() }]
      });
    }

    res.json({ message: "Task completed", task });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// 🔄 RESCHEDULE TASK
export const rescheduleTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { newDate } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.dueDateTime = newDate;

    task.history.push({
      action: "Task rescheduled",
      date: new Date()
    });

    await task.save();

    res.json(task);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};