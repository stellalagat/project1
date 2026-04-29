import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";
import History from "../components/History";
import "./Dashboard.css";
import { useNotifications } from "../context/NotificationContext";
import NotificationCenter from "./Notifications"; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("active");
  const [statusFilter, setStatusFilter] = useState("All");

  const { user } = useContext(AuthContext);
  const { addNotification, notifications } = useNotifications();

  // 🔥 TRACK ALREADY NOTIFIED TASKS
  const notifiedTasks = useRef(new Set());

  /* ---------------- FETCH TASKS ---------------- */
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");

      const data = Array.isArray(res.data)
        ? res.data
        : res.data?.tasks || [];

      setTasks(data);
    } catch (err) {
      console.log("FETCH ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /* ---------------- NOTIFICATION LOGIC ---------------- */
  useEffect(() => {
    const now = new Date();

    tasks.forEach((task) => {
      const due = task.dueDate ? new Date(task.dueDate) : null;
      if (!due || isNaN(due)) return;

      const diffHours = (now - due) / (1000 * 60 * 60);

      const key = `${task._id}-${task.status}`;

      // 🚨 prevent duplicates
      if (notifiedTasks.current.has(key)) return;

      if (diffHours > 24 && task.status !== "Completed") {
        addNotification({
          type: "missed",
          message: `❌ ${task.title} was missed`,
        });

        notifiedTasks.current.add(key);
      } else if (diffHours > 0 && task.status !== "Completed") {
        addNotification({
          type: "overdue",
          message: `⚠️ ${task.title} is overdue`,
        });

        notifiedTasks.current.add(key);
      }
    });
  }, [tasks]);

  /* ---------------- PROCESS TASKS ---------------- */
  const now = new Date();

  const processedTasks = (tasks || []).map((task) => {
    const due = task.dueDate ? new Date(task.dueDate) : null;
    if (!due || isNaN(due)) return task;

    const diffHours = (now - due) / (1000 * 60 * 60);

    let status = task.status;

    if (diffHours > 24 && task.status !== "Completed") {
      status = "Missed";
    } else if (diffHours > 0 && task.status !== "Completed") {
      status = "Overdue";
    }

    return {
      ...task,
      status,
      isOverdue: status === "Overdue",
    };
  });

  /* ---------------- SPLIT SYSTEM ---------------- */
  const activeTasks = processedTasks.filter((t) =>
    ["Pending", "In Progress", "Overdue"].includes(t.status)
  );

  const historyTasks = processedTasks.filter((t) =>
    ["Completed", "Missed"].includes(t.status)
  );

  const filteredActiveTasks =
    statusFilter === "All"
      ? activeTasks
      : activeTasks.filter((t) => t.status === statusFilter);

  /* ---------------- UI ---------------- */
  return (
    <div className="dashboard-container">

      <h1>Task Dashboard</h1>
<NotificationCenter />  
      <p style={{ color: "gray" }}>
        Logged in as: {user?.name || "Guest"}
      </p>

      <TaskForm fetchTasks={fetchTasks} />

      {/* 🔥 VIEW SWITCH */}
      <div className="view-switch">
        <button onClick={() => setView("active")}>
          Active Tasks
        </button>

        <button onClick={() => setView("history")}>
          History
        </button>
      </div>

      {/* 🔥 FILTER */}
      {view === "active" && (
        <div className="status-dropdown">
          <label>Filter: </label>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Active</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      )}

      {/* 🔥 RENDER */}
      {view === "active" ? (
        <TaskBoard
          tasks={filteredActiveTasks}
          fetchTasks={fetchTasks}
          view="active"
        />
      ) : (
        <History tasks={historyTasks} />
      )}

    </div>

  );
  
};


export default Dashboard;