import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#0f172a",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      
      {/* TOP */}
      <div>
        <h2 style={{ color: "#38bdf8" }}>SmartTask</h2>

        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            
            <li style={{ margin: "15px 0" }}>
              <Link style={{ color: "#fff", textDecoration: "none" }} to="/dashboard">
                Dashboard
              </Link>
            </li>

            <li style={{ margin: "15px 0" }}>
              <Link style={{ color: "#fff", textDecoration: "none" }} to="/profile">
                Profile
              </Link>
            </li>

          </ul>
        </nav>
      </div>

      {/* BOTTOM (LOGOUT) */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px",
          background: "#ef4444",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>
  );
};

export default Sidebar;