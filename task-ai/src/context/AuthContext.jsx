import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 LOGIN
  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  // 🔥 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // 🔥 RESTORE SESSION (THIS FIXES YOUR PROBLEM)
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log("Auth restore failed");
        localStorage.removeItem("token");
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);