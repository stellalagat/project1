import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      console.log("Email:", email);
      console.log("Password:", password);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("FULL RESPONSE:", res);
      console.log("DATA:", res.data);

      // save token
      localStorage.setItem("token", res.data.token);

      console.log("SAVED TOKEN:", localStorage.getItem("token"));

      // CLEAN redirect (React way)
      navigate("/dashboard");

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">SmartTask AI</h1>
        <p className="login-subtitle">Welcome back — login to continue</p>

        <form onSubmit={login}>

          <input
            className="login-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Login
          </button>

        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#38bdf8", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
        <Link to="/" style={{ color: "#38bdf8" }}>
  Back to Home
</Link>

      </div>

    </div>
  );
};

export default Login;