import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#fbbf24"];

// Sample data (later you will connect to your tasks state)
const taskStatusData = [
  { name: "Completed", value: 12 },
  { name: "Pending", value: 5 },
];

const weeklyActivityData = [
  { day: "Mon", tasks: 3 },
  { day: "Tue", tasks: 5 },
  { day: "Wed", tasks: 2 },
  { day: "Thu", tasks: 6 },
  { day: "Fri", tasks: 4 },
  { day: "Sat", tasks: 7 },
  { day: "Sun", tasks: 1 },
];

const taskTrendData = [
  { week: "W1", completed: 5 },
  { week: "W2", completed: 8 },
  { week: "W3", completed: 6 },
  { week: "W4", completed: 12 },
];

export default function Stats() {
  return (
    <div className="p-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {/* PIE CHART */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Task Status</h2>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={taskStatusData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {taskStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyActivityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tasks" fill="#60a5fa" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART */}
      <div className="bg-white rounded-2xl shadow p-4 md:col-span-2 lg:col-span-1">
        <h2 className="text-lg font-semibold mb-4">Completion Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={taskTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#4ade80"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}