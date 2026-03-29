export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 shadow px-6 py-4 flex justify-between items-center"
          : "bg-white shadow px-6 py-4 flex justify-between items-center"
      }
    >
      <h2 className="text-blue-700 font-bold text-xl">
        SmartTask AI Dashboard
      </h2>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
    </div>
  );
}