import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";
import Order from "./pages/Order";
import Inventory from "./pages/Inventory";
import Pay from "./pages/Pay";
import OrderPlaced from "./pages/OrderPlaced";
import OrderTracking from "./pages/OrderTracking";
import Kitchen from "./pages/Kitchen";

function AppContent({ orderItems, setOrderItems, orders, setOrders, inventory, setInventory, role, setRole }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth onLogin={setRole} />} />
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
  path="/pay"
  element={<Pay orderItems={orderItems} setOrderItems={setOrderItems} orders={orders} setOrders={setOrders} />}
/>

        <Route path="/order-placed" element={<OrderPlaced />} />
        <Route path="/order-tracking" element={<OrderTracking />} />

        {role === "admin" && (
          <Route
            path="/inventory"
            element={<Inventory inventory={inventory} setInventory={setInventory} />}
          />
        )}
        {role === "kitchen_staff" && (
          <Route
            path="/kitchen"
            element={<Kitchen orders={orders} setOrders={setOrders} />}
          />
        )}
      </Routes>
    </>
  );
}

function App() {
  const [orderItems, setOrderItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([
    { id: 1, name: "Veg Burger", stock: 10 },
    { id: 2, name: "Pizza", stock: 10 },
    { id: 3, name: "Pasta", stock: 10 },
    { id: 4, name: "Sandwich", stock: 10 },
    { id: 5, name: "Fries", stock: 10 },
    { id: 6, name: "Cold Drink", stock: 10 }
  ]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  return (
    <Router>
      <AppContent
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        orders={orders}
        setOrders={setOrders}
        inventory={inventory}
        setInventory={setInventory}
        role={role}
        setRole={setRole}
      />
    </Router>
  );
}

export default App;
