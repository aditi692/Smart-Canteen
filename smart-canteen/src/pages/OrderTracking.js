import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./OrderTracking.css";

const OrderTracking = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState(null);
  const [canCancel, setCanCancel] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [noOrders, setNoOrders] = useState(false);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const userEmail = localStorage.getItem('userEmail');

        console.log('Token:', token ? 'present' : 'missing');
        console.log('UserEmail:', userEmail);

        if (!token) {
          alert('Please login to view your orders');
          navigate('/'); // Redirect to login
          return;
        }

        if (!userEmail) {
          alert('User email not found. Please login again.');
          navigate('/');
          return;
        }

        const res = await api.get('/api/orders/user', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Orders response:', res.data);

        // The backend already filters by user, so use the response directly
        const userOrders = Array.isArray(res.data) ? res.data : [res.data];

        console.log('User orders:', userOrders);

        if (Array.isArray(userOrders) && userOrders.length > 0) {
          // Sort by orderTime descending to get the latest
          const sortedOrders = [...userOrders].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
          let order = sortedOrders[0];
          // Defensive: if order is array, use its first element
          if (Array.isArray(order)) order = order[0];

          if (!order || !order.orderTime || !order.status) {
            console.warn("Fetched order is invalid:", order);
            setCurrentOrder(null);
            setCanCancel(false);
            setTimeLeft(0);
            setNoOrders(true);
            return;
          }

          setCurrentOrder(order);

          // Check if order can be cancelled (within 5 minutes and status PENDING or PREPARING)
          const now = new Date();
          const orderTime = new Date(order.orderTime);
          const diffMinutes = (now - orderTime) / (1000 * 60);
          const canCancelOrder = diffMinutes <= 5 && (order.status === 'PENDING' || order.status === 'PREPARING');
          setCanCancel(canCancelOrder);

          // Calculate time left for cancellation (only if can cancel)
          if (canCancelOrder) {
            const timeLeftSeconds = Math.max(0, Math.floor((5 * 60 * 1000 - (now - orderTime)) / 1000));
            setTimeLeft(timeLeftSeconds);
          } else {
            setTimeLeft(0);
          }

          console.log('Order details:', order);
          console.log('Can cancel:', canCancelOrder, 'Time diff:', diffMinutes, 'Status:', order.status);
        } else {
          console.log('No orders found for user:', userEmail);
          setNoOrders(true);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
        alert('Failed to load order details. Please try logging in again.');
        navigate('/');
      }
    };
    fetchLatestOrder();

    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanCancel(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleCancel = async () => {
    if (!currentOrder || !currentOrder.id) {
      alert("Order not found or invalid");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to cancel order');
        return;
      }

      await api.put(`/api/orders/${currentOrder.id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update local order status
      setCurrentOrder({ ...currentOrder, status: "CANCELLED" });
      setCanCancel(false);
      alert("Order cancelled successfully!");
      navigate("/menu"); // Redirect to menu after cancellation
    } catch (err) {
      console.error('Cancel error:', err);
      alert(err?.response?.data?.message || "Cancellation failed");
    }
  };

  // Debug for troubleshooting
  console.log('Render: currentOrder', currentOrder, 'canCancel', canCancel, 'timeLeft', timeLeft);

  if (noOrders) {
    return (
      <div className="order-tracking-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h2>No orders found. Please place an order first.</h2>
        <button
          onClick={() => navigate('/menu')}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginTop: '20px'
          }}
        >
          Go to Menu
        </button>
      </div>
    );
  }

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

      {canCancel && (
        <div style={{
          marginTop: 20,
          padding: "15px",
          backgroundColor: "#fff3cd",
          border: "1px solid #ffeaa7",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold", color: "#856404" }}>
            ⏰ Time left to cancel: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
          <p style={{ margin: "0 0 15px 0", fontSize: "14px", color: "#856404" }}>
            Note: You can only cancel orders within 5 minutes of placement
          </p>
          <button
            onClick={handleCancel}
            style={{
              backgroundColor: "red",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: 5,
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Cancel Order
          </button>
        </div>
      )}

      <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
        <button className="done-btn">Done</button>
      </div>
    </div>
  );
};

export default OrderTracking;
