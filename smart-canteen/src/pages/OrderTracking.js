import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./OrderTracking.css";

const OrderTracking = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [canCancel, setCanCancel] = useState(false);

  useEffect(() => {
    // Fetch the latest order (assuming the last one in orders array)
    if (orders.length > 0) {
      const order = orders[orders.length - 1];
      setCurrentOrder(order);
      // For demo purposes, always allow cancellation
      setCanCancel(true);
    }
  }, [orders]);

  const handleCancel = async () => {
    if (!currentOrder) return;
    try {
      await api.put(`/api/orders/${currentOrder.id}/cancel`);
      // Update order status in state
      const updatedOrders = orders.map(o =>
        o.id === currentOrder.id ? { ...o, status: "CANCELLED" } : o
      );
      setOrders(updatedOrders);
      alert("Order cancelled successfully!");
      navigate("/menu"); // Redirect to menu after cancellation
    } catch (err) {
      alert(err?.response?.data?.message || "Cancellation failed");
    }
  };

  if (!currentOrder) return <div>Loading...</div>;

  return (
    <div className="order-tracking-container">
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="Salad Bowl"
          className="header-icon"
        />
        <p className="header-text">
          {currentOrder.status === "CANCELLED"
            ? "Order has been cancelled."
            : `Your food is being prepared. Order will be ready in 17 minutes.`}
        </p>
      </div>

      <div className="tracking-timeline">
        <div className="line"></div>

        <div className="step completed">
          <div className="dot"></div>
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png"
              alt="Order Placed"
            />
            <p>Order Placed</p>
          </div>
        </div>

        <div className="step completed">
          <div className="dot"></div>
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828643.png"
              alt="Order Accepted"
            />
            <p>Order Accepted</p>
          </div>
        </div>

        <div className="step">
          <div className="dot"></div>
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046872.png"
              alt="Preparing Order"
            />
            <p>Preparing the order</p>
          </div>
        </div>

        <div className="step">
          <div className="dot"></div>
          <div className="content">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1791/1791318.png"
              alt="Ready"
            />
            <p>Ready!</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
        {canCancel && (
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer"
            }}
          >
            Cancel Order
          </button>
        )}
        <button className="done-btn">Done</button>
      </div>
    </div>
  );
};

export default OrderTracking;
