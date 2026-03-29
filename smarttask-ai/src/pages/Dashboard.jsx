import { useEffect, useState } from "react";
import { getTasks } from "../utils/taskLogic";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-blue-700">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl text-gray-500 font-bold">{total}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h2 className="text-gray-500">Pending</h2>
          <p className="text-2xl font-bold text-red-300">{pending}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
          <h2 className="text-gray-500">Completed</h2>
          <p className="text-2xl font-bold text-green-300">{completed}</p>
        </div>

      </div>

    </div>
  );
}