import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYou.css";

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <div className="thankyou-hero">
          <div className="thankyou-badge" aria-hidden="true">
            <span>&#10003;</span>
          </div>
          <div className="thankyou-text">
            <p className="thankyou-kicker">Order Completed</p>
            <h2>Thank you for dining with us!</h2>
            <p className="thankyou-copy">
              Your order is ready and marked as completed. We hope you enjoyed every bite.
            </p>
          </div>
        </div>

        <div className="thankyou-details">
          <div className="detail-tile">
            <span>Next step</span>
            <strong>Explore the menu</strong>
          </div>
          <div className="detail-tile">
            <span>Need help?</span>
            <strong>Visit the counter</strong>
          </div>
        </div>

        <div className="thankyou-actions">
          <button className="thankyou-btn" onClick={() => navigate("/menu")}>
            Back to Menu
          </button>
        </div>

        <p className="thankyou-foot">Come back anytime for a fresh order.</p>
      </div>
    </div>
  );
}
