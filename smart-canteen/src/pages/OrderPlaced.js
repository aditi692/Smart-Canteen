import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPlaced.css";

export default function OrderPlaced() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/order-tracking");
    }, 3000); // 3 sec redirect
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="order-placed-container">
      <div className="tick-mark">✅</div>
      <h2>Order Placed Successfully!</h2>
      <p>Redirecting to your order tracking page...</p>
    </div>
  );
}
