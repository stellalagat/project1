import { useEffect, useState } from "react";
import { getTasks, saveTasks } from "../utils/taskLogic";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      priority,
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setTitle("");
    setPriority("medium");
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );

    setTasks(updated);
    saveTasks(updated);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500 text-red-600 bg-red-50";
      case "medium":
        return "border-yellow-400 text-yellow-600 bg-yellow-50";
      case "low":
        return "border-green-500 text-green-600 bg-green-50";
      default:
        return "border-gray-200 text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-blue-700">
        Tasks Manager
      </h1>

      {/* ADD TASK */}
      <div className="flex gap-2 flex-wrap">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 p-3 rounded-lg border focus:outline-blue-500"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-3 border rounded-lg"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* TASK LIST */}
      <div className="grid gap-3">

        {tasks.length === 0 && (
          <p className="text-gray-500">No tasks yet. Add one 🚀</p>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border shadow-sm flex justify-between items-center hover:shadow-md transition ${getPriorityStyle(task.priority)}`}
          >

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 accent-blue-600"
              />

              <span
                className={`text-lg ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>

              {/* PRIORITY BADGE */}
              <span className="text-xs px-2 py-1 rounded-full border bg-white">
                {task.priority}
              </span>

            </div>

            {/* DELETE */}
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}