import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Smart Canteen</h2>
      <ul>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/order">Order</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
