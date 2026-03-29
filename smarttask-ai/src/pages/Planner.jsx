import { useState } from "react";
import { getTasks, saveTasks } from "../utils/taskLogic";

export default function Planner() {
  const [tasks, setTasks] = useState(getTasks());
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("Monday");

  const addPlannedTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      day,
      completed: false,
    };

    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks(updated);
    setTitle("");
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-blue-700">
        Weekly Planner
      </h1>

      {/* ADD TASK */}
      <div className="flex gap-2 flex-wrap">

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Plan a task..."
          className="flex-1 p-3 border rounded-lg"
        />

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="p-3 border rounded-lg"
        >
          {days.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <button
          onClick={addPlannedTask}
          className="bg-blue-600 text-white px-5 rounded-lg"
        >
          Add
        </button>

      </div>

      {/* WEEK GRID */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {days.map((d) => (
          <div
            key={d}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <h2 className="font-bold text-blue-700 mb-3">{d}</h2>

            {tasks
              .filter((t) => t.day === d)
              .map((t) => (
                <div
                  key={t.id}
                  className="p-2 mb-2 bg-gray-50 rounded-lg text-sm"
                >
                  {t.title}
                </div>
              ))}

          </div>
        ))}

      </div>

    </div>
  );
}