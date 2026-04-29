import { useState } from "react";
import API from "../api/axios";

const TaskForm = ({ fetchTasks }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    repeat: "none",
    isRoutine: false,
    role: "General",
    priority: "Medium",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        description: form.description,
        repeat: form.repeat,
        isRoutine: form.isRoutine,
        role: form.role,
        status: "Pending",

        // 🔥 IMPORTANT
        priority: form.priority || "Medium",

        startDate: form.startDate
          ? new Date(form.startDate)
          : new Date(),

        dueDate: form.dueDate
          ? new Date(form.dueDate)
          : null,
      };

      console.log("SENDING TASK:", payload);

      await API.post("/tasks", payload);

      // 🔥 RESET FORM (FIXED - includes priority)
      setForm({
        title: "",
        description: "",
        startDate: "",
        dueDate: "",
        repeat: "none",
        isRoutine: false,
        role: "General",
        priority: "Medium",
      });

      fetchTasks();
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create Task</h2>

      <input
        type="text"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <label>Start Date:</label>
      <input
        type="date"
        name="startDate"
        value={form.startDate}
        onChange={handleChange}
        required
      />

      <label>Due Date:</label>
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />

      <label>Repeat:</label>
      <select name="repeat" value={form.repeat} onChange={handleChange}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="isRoutine"
          checked={form.isRoutine}
          onChange={handleChange}
        />
        Routine Task
      </label>

      <label>Role:</label>
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="General">General</option>
        <option value="Student">Student</option>
        <option value="Developer">Developer</option>
        <option value="Farmer">Farmer</option>
        <option value="Nurse">Nurse</option>
      </select>

      <label>Priority:</label>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;