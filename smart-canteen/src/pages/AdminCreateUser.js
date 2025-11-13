import React, { useState } from "react";
import API from "../api";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "KITCHEN_STAFF", // default selected role
  });
  const [message, setMessage] = useState(null); // success or error message

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

  // Helper to determine color safely
  const getMessageColor = () => {
    if (typeof message === "string") {
      return message.toLowerCase().includes("error") ? "red" : "green";
    }
    return "black"; // default color for objects or unknown types
  };

  return (
    <div>
      <h2>Create Kitchen Staff/Admin User</h2>
      {message && (
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", color: getMessageColor() }}>
          {typeof message === "string" ? message : JSON.stringify(message, null, 2)}
        </pre>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <select name="role" value={form.role} onChange={handleChange} required>
          <option value="KITCHEN_STAFF">Kitchen Staff</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
