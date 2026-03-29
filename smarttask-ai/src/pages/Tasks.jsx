import { useEffect, useState } from "react";
import { getTasks, saveTasks } from "../utils/taskLogic";
import DashboardCharts from "../components/DashboardCharts";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    setTasks(getTasks());

    // Ask notification permission once
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // OVERDUE CHECK
  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false;

    const today = new Date();
    const taskDate = new Date(dueDate);

    return taskDate < new Date(today.setHours(0, 0, 0, 0));
  };

  // SHOW NOTIFICATION
  const showNotification = (taskTitle) => {
    if (Notification.permission === "granted") {
      new Notification("⚠️ Task Overdue", {
        body: `${taskTitle} is overdue.`,
        icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
      });
    }
  };

  // PREVENT SPAM NOTIFICATIONS (simple memory tracker)
  const notifiedTasks = new Set();

  useEffect(() => {
    tasks.forEach((task) => {
      const overdue = isOverdue(task.dueDate, task.completed);

      if (overdue && !task.completed && !notifiedTasks.has(task.id)) {
        showNotification(task.title);
        notifiedTasks.add(task.id);
      }
    });
  }, [tasks]);

  // STATS (optional but included since your app already has it)
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const overdueTasks = tasks.filter((t) =>
    isOverdue(t.dueDate, t.completed)
  ).length;

  const addTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      priority,
      dueDate: dueDate || "",
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);

    setTitle("");
    setPriority("medium");
    setDueDate("");
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

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-blue-700">
        Tasks Manager
      </h1>
      <DashboardCharts tasks={tasks} />

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <div className="p-3 rounded-lg bg-blue-50 border">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-xl font-bold text-blue-700">{totalTasks}</p>
        </div>

        <div className="p-3 rounded-lg bg-green-50 border">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-xl font-bold text-green-600">{completedTasks}</p>
        </div>

        <div className="p-3 rounded-lg bg-yellow-50 border">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-xl font-bold text-yellow-600">{pendingTasks}</p>
        </div>

        <div className="p-3 rounded-lg bg-red-50 border">
          <p className="text-sm text-gray-600">Overdue</p>
          <p className="text-xl font-bold text-red-600">{overdueTasks}</p>
        </div>

      </div>

      {/* ADD TASK */}
      <div className="flex gap-2 flex-wrap">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="flex-1 p-3 rounded-lg border focus:outline-blue-500"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-3 rounded-lg border"
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
            className={`p-4 rounded-xl border shadow-sm flex justify-between items-center hover:shadow-md transition
              ${getPriorityStyle(task.priority)}
              ${isOverdue(task.dueDate, task.completed) ? "border-red-600 bg-red-100" : ""}
            `}
          >

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-1">

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

                <span className="text-xs px-2 py-1 rounded-full border bg-white">
                  {task.priority}
                </span>

              </div>

              {/* DUE DATE */}
              {task.dueDate && (
                <p className="text-xs text-gray-500 ml-8">
                  Due: {task.dueDate}
                </p>
              )}

              {/* OVERDUE BADGE */}
              {isOverdue(task.dueDate, task.completed) && (
                <span className="text-xs text-white bg-red-500 px-2 py-1 rounded-full ml-8 w-fit">
                  Overdue
                </span>
              )}

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