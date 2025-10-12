import React from "react";
import { useNavigate } from "react-router-dom";
import "./Order.css";

export default function Order({ orderItems = [], setOrderItems = () => {} }) {
  const navigate = useNavigate(); // Add this line
  const handleRemove = (id) => {
  const updated = orderItems.filter(item => item.id !== id);
  setOrderItems(updated);
};

  // Group items by id and count quantity
  const cart = orderItems.reduce((acc, item) => {
    const found = acc.find(i => i.id === item.id);
    if (found) found.qty += 1;
    else acc.push({ ...item, qty: 1 });
    return acc;
  }, []);

  const handleQty = (id, delta) => {
    let updated = [];
    orderItems.forEach(item => {
      if (item.id === id && delta < 0) {
        if (updated.filter(i => i.id === id).length < cart.find(i => i.id === id).qty - 1) {
          updated.push(item);
        }
      } else if (item.id === id && delta > 0) {
        updated.push(item);
      } else if (item.id !== id) {
        updated.push(item);
      }
    });
    if (delta > 0) {
      const addItem = orderItems.find(item => item.id === id);
      updated.push(addItem);
    }
    setOrderItems(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="order-bg">
      <div className="order-header">Your Cart</div>
      <div className="order-list">
        {cart.map(item => (
          <div className="order-card" key={item.id}>
            <img src={item.img} alt={item.name} className="order-img" />
            <div className="order-info">
              <div className="order-title">{item.name}</div>
              <div className="order-meta">
                <span className="order-rating">★ 4.{item.id % 5 + 2}</span>
                <span className="order-time">{10 + item.id % 10} min</span>
              </div>
              <div className="order-price">₹{item.price}</div>
            </div>
            <div className="order-qty">
              <button onClick={() => handleQty(item.id, -1)} disabled={item.qty === 1}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => handleQty(item.id, 1)}>+</button>
            </div>
            <button className="order-remove" onClick={() => handleRemove(item.id)}>Remove</button>
          </div>
        ))}
        <div className="add-more" onClick={() => navigate("/menu")}>+ Add more Items</div>
        <div className="order-summary">
          {cart.map(item => (
            <div className="order-summary-row" key={item.id}>
              <span>{item.name}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div className="order-summary-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
        <div className="order-wait">
          <span>🕒 Estimated wait time: 17-20 min</span>
        </div>
        <div className="order-offer">
          <input type="text" placeholder="Apply code here" />
          <button>Apply</button>
        </div>
        <button className="order-pay" onClick={() => navigate("/pay")}>Proceed to pay</button>
      </div>
    </div>
  );
}