import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";

import TaskCard from "../components/TaskCard";
import "./tasks.css";

/* ------------------ COLUMN ------------------ */
const Column = ({ status, children }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div ref={setNodeRef} className="column">
      <h2>{status}</h2>
      {children}
    </div>
  );
};

/* ------------------ GROUP TASKS ------------------ */
const getColumns = (tasks, view) => {
  const data = tasks || [];

  if (view === "active") {
    return {
      Pending: data.filter((t) => t.status === "Pending"),
      "In Progress": data.filter((t) => t.status === "In Progress"),
      Overdue: data.filter((t) => t.status === "Overdue"),
    };
  }

  if (view === "history") {
    return {
      Completed: data.filter((t) => t.status === "Completed"),
      Missed: data.filter((t) => t.status === "Missed"),
    };
  }

  return {};
};

/* ------------------ TASK BOARD ------------------ */
const TaskBoard = ({ tasks = [], fetchTasks, view = "active" }) => {
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  /* ------------------ DRAG SENSORS ------------------ */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const columns = getColumns(localTasks, view);
  const allowedStatuses = Object.keys(columns);

  /* ------------------ DRAG END ------------------ */
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // block invalid moves
    if (!allowedStatuses.includes(newStatus)) return;

    setLocalTasks((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      )
    );

    try {
      await API.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.log("DRAG ERROR:", err.message);
      fetchTasks();
    }
  };

  /* ------------------ STATUS UPDATE BUTTON ------------------ */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      fetchTasks();
    } catch (err) {
      console.log("STATUS UPDATE ERROR:", err.message);
    }
  };

  return (
    <div className="board">

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        {Object.keys(columns).map((status) => (
          <Column key={status} status={status}>
            {columns[status].map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onUpdateStatus={updateStatus}
              />
            ))}
          </Column>
        ))}

      </DndContext>

    </div>
  );
};

export default TaskBoard;