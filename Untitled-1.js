import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Later: Connect to backend API
    if (email === "admin@gmail.com" && password === "12345") {
      alert("Login Successful 🚀");
      window.location.href = "/menu"; // Redirect to menu page
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <h2>Smart Kitchen</h2>
      </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
