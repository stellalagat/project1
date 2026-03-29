import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white text-blue-700 font-semibold"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <div className="w-64 min-h-screen bg-blue-700 p-5">
      <h1 className="text-white text-2xl font-bold mb-8">
        SmartTask AI
      </h1>

      <nav className="space-y-2">
        <Link to="/" className={linkClass("/")}>Dashboard</Link>
        <Link to="/tasks" className={linkClass("/tasks")}>Tasks</Link>
        <Link to="/planner" className={linkClass("/planner")}>Planner</Link>
        <Link to="/analytics" className={linkClass("/analytics")}>Analytics</Link>
      </nav>
    </div>
  );
}