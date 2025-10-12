import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login: any email/password works
    onLogin(form.role);
    navigate(form.role === "kitchen_staff" ? "/kitchen" : "/menu"); // Redirect based on role
  };

  return (
    <div className="auth-bg">
      <div className="logo">Campus Bite</div>
      <div className="auth-box">
        <div className="tabs">
          <span
            className={!isSignup ? "active" : ""}
            onClick={() => setIsSignup(false)}
          >
            Log In
          </span>
          <span
            className={isSignup ? "active" : ""}
            onClick={() => setIsSignup(true)}
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
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="customer">Customer</option>
            <option value="kitchen_staff">Kitchen Staff</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </div>
  );
}