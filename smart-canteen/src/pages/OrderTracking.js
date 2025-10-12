import React from "react";
import "./OrderTracking.css";

const OrderTracking = () => {
  return (
    <div className="order-tracking-container">
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="Salad Bowl"
          className="header-icon"
        />
        <p className="header-text">
          Your food is being prepared. Order will be ready in <b>17 minutes.</b>
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

      <button className="done-btn">Done</button>
    </div>
  );
};

export default OrderTracking;
