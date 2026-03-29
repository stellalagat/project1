import { useEffect, useState } from "react";
import { getTasks } from "../utils/taskLogic";

export default function Analytics() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  const completionRate =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-blue-700">
        Analytics Overview
      </h1>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl text-gray-500 font-bold">{total}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold text-red-500">{pending}</p>
        </div>

      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">

        <h2 className="text-lg font-semibold mb-3">
          Completion Rate
        </h2>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          {completionRate}% tasks completed
        </p>

      </div>

    </div>
  );
}