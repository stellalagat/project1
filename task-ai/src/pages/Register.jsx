import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      console.log("REGISTER SUCCESS:", res.data);

      // optional redirect to login
      window.location.href = "/login";

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="register-container">

      <div className="register-card">

        <h1 className="register-title">Create Account</h1>
        <p className="register-subtitle">
          Join SmartTask AI and boost your productivity
        </p>

        <form onSubmit={register}>

          <input
            className="register-input"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="register-input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="register-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register-btn" type="submit">
            Sign Up
          </button>

        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#10b981", textDecoration: "none" }}>
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;