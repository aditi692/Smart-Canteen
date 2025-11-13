import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function Pay({ orderItems = [], setOrderItems = () => {}, orders = [], setOrders = () => {} }) {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");

  const cart = orderItems.reduce((acc, item) => {
    const found = acc.find(i => i.id === item.id);
    if (found) found.qty += 1;
    else acc.push({ ...item, qty: 1 });
    return acc;
  }, []);

  const handlePayment = async () => {
    if (!tableNumber.trim()) {
      alert("Please enter a valid table number");
      return;
    }

    const payload = {
      tableNumber: tableNumber,
      items: cart.map(i => ({ menuItemId: i.id, quantity: i.qty })),
      customerEmail: localStorage.getItem('userEmail') || null
    };

    try {
      const res = await api.post("/api/orders", payload);
      setOrderItems([]);
      setOrders([...orders, res.data]);
      navigate("/order-placed");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Order failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Confirm & Pay</h3>
      <input
        type="text"
        placeholder="Enter Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        required
        style={{ marginBottom: 10, padding: 8, fontSize: 16 }}
      />
      <p>Items: {cart.length}</p>
      <p>Total: ₹{cart.reduce((s, i) => s + i.price * i.qty, 0)}</p>
      <button onClick={handlePayment}>Pay & Place Order</button>
      <p style={{ marginTop: 10, fontStyle: "italic", color: "gray" }}>
        * This is a demo payment. No real payment is processed.
      </p>
    </div>
  );
}
