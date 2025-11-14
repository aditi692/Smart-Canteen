import React, { useState } from "react";
import API from "../api";
import "./AdminCreateUser.css";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "KITCHEN_STAFF",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await API.post("/api/admin/create-user", form);
      setMessage("User created successfully.");
      setForm({ name: "", email: "", password: "", role: "KITCHEN_STAFF" });
    } catch (err) {
      setMessage(err.response?.data || "Error creating user");
    }
  };

  const getMessageColor = () => {
    if (typeof message === "string") {
      return message.toLowerCase().includes("error") ? "red" : "green";
    }
    return "black";
  };

  return (
    <div className="admin-create-user-bg">
      <div className="admin-create-user-card">
        <h2>Create Kitchen Staff/Admin User</h2>
        {message && (
          <div
            className={`admin-message ${message.toLowerCase().includes("error") ? "error" : "success"}`}
            style={{ color: getMessageColor() }}
          >
            {typeof message === "string" ? message : JSON.stringify(message, null, 2)}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </label>
          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="KITCHEN_STAFF">Kitchen Staff</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <button type="submit" className="admin-create-btn">Create User</button>
        </form>
      </div>
    </div>
  );
}
