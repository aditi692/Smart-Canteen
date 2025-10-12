import React from "react";
import { useNavigate } from "react-router-dom";

export default function Pay({ orderItems, setOrderItems, orders, setOrders }) {
  const navigate = useNavigate();

  // Group items by id and count quantity
  const cart = orderItems.reduce((acc, item) => {
    const found = acc.find(i => i.id === item.id);
    if (found) found.qty += 1;
    else acc.push({ ...item, qty: 1 });
    return acc;
  }, []);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const handlePayment = () => {
    const order = { id: Date.now(), items: cart, total: totalPrice, status: "PLACED" };
    setOrders(prev => [...prev, order]);
    setOrderItems([]); // Clear the cart after payment
    alert("Redirecting to Razorpay (Dummy)...");
    setTimeout(() => navigate("/order-placed"), 2000);
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Payment</h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <h3>Order Summary</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} x {item.qty} = ₹{item.price * item.qty}
            </li>
          ))}
        </ul>
        <p>
          <strong>Total Items:</strong> {totalItems}
        </p>
        <p>
          <strong>Total Price:</strong> ₹{totalPrice}
        </p>
      </div>

      <button
        style={{
          background: "#ff9800",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}
