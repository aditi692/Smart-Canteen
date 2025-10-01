import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import Navbar from "./components/Navbar";

function App() {
  // Shared state here
  const [orderItems, setOrderItems] = useState([]);
  const [inventory, setInventory] = useState([
    { id: 1, name: "Veg Burger", stock: 10 },
    { id: 2, name: "Pizza", stock: 10 },
    { id: 3, name: "Pasta", stock: 10 },
    { id: 4, name: "Sandwich", stock: 10 },
    { id: 5, name: "Fries", stock: 10 },
    { id: 6, name: "Cold Drink", stock: 10 }
  ]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/menu"
          element={
            <Menu
              orderItems={orderItems}
              setOrderItems={setOrderItems}
              inventory={inventory}
              setInventory={setInventory}
            />
          }
        />
        <Route
          path="/order"
          element={<Order orderItems={orderItems} setOrderItems={setOrderItems} />}
        />
        <Route
          path="/inventory"
          element={<Inventory inventory={inventory} setInventory={setInventory} />}
        />
      </Routes>
    </Router>
  );
}

export default App;








