import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [token, setToken] = useState("");
  return (
    <div
      className={
        darkMode
          ? "flex min-h-screen bg-gray-900 text-white"
          : "flex min-h-screen bg-gray-50 text-gray-800"
      }
    >
      <Sidebar darkMode={darkMode} />

      <div className="flex-1 flex flex-col">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}