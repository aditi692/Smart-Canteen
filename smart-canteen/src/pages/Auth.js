import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

export default function Auth({ onLogin = () => {} }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "CUSTOMER" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        // Signup allows only CUSTOMER role
        await API.post("/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
          role: "CUSTOMER",
        });
        setIsSignup(false);
        setForm({ name: "", email: "", password: "", role: "CUSTOMER" });
        setSuccessMessage("Registration successful! Please log in.");
      } else {
        // Login with chosen role
        const res = await API.post("/api/auth/login", {
          email: form.email,
          password: form.password,
          role: form.role,
        });

        const token = res.data?.token ?? res.data?.data?.token;
        // Save token and role to localStorage
        if (token) localStorage.setItem("token", token);
        localStorage.setItem("role", form.role.toUpperCase());

        const userRole = form.role.toUpperCase();
        onLogin(userRole);

        if (userRole === "KITCHEN_STAFF") {
          navigate("/kitchen");
        } else if (userRole === "ADMIN") {
          navigate("/admin/create-user");
        } else {
          navigate("/menu");
        }
      }
    } catch (err) {
      setError(err?.response?.data || err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="logo">Campus Bite</div>
      <div className="auth-box">
        <div className="tabs">
          <span
            className={!isSignup ? "active" : ""}
            onClick={() => {
              setIsSignup(false);
              setError(null);
              setSuccessMessage("");
            }}
          >
            Log In
          </span>
          <span
            className={isSignup ? "active" : ""}
            onClick={() => {
              setIsSignup(true);
              setError(null);
              setSuccessMessage("");
            }}
          >
            Sign Up
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete={isSignup ? "new-password" : "current-password"}
          />

          {!isSignup && (
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="CUSTOMER">Customer</option>
              <option value="KITCHEN_STAFF">Kitchen Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          )}

          {error && (
            <div className="auth-error">
              {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
            </div>
          )}
          {successMessage && <div className="auth-success">{successMessage}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
