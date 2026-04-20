export default function Navbar({ darkMode, setDarkMode, setToken }) {

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 shadow px-6 py-4 flex justify-between items-center"
          : "bg-white shadow px-6 py-4 flex justify-between items-center"
      }
    >
      {/* Title */}
      <h2 className="text-blue-700 font-bold text-xl">
        SmartTask AI Dashboard
      </h2>

      {/* Right Side Buttons */}
      <div className="flex gap-4 items-center">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {darkMode ? "Light ☀️" : "Dark 🌙"}
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
}