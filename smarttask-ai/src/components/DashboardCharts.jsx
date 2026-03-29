import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardCharts({ tasks }) {
  // STATS CALCULATION
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.filter((t) => !t.completed).length;

  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  };

  const overdue = tasks.filter(isOverdue).length;

  // PIE DATA
  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ];

  // BAR DATA
  const barData = [
    { name: "Total", value: total },
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="space-y-8">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-blue-700">
        Task Analytics Dashboard
      </h2>

      {/* PIE CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Task Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Task Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}