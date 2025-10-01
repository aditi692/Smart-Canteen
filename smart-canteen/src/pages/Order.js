import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Order.css";

function Order() {
  const location = useLocation();
  const navigate = useNavigate();

 
  const initialItems = location.state?.items || [];
  const [orderItems, setOrderItems] = useState(initialItems);
  const [thankYouMsg, setThankYouMsg] = useState("");

 
  const itemCounts = orderItems.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  const total = orderItems.reduce((sum, item) => sum + item.price, 0);

  
  const handleRemove = (name) => {
    const index = orderItems.findIndex((i) => i.name === name);
    if (index !== -1) {
      const newItems = [...orderItems];
      newItems.splice(index, 1);
      setOrderItems(newItems);
    }
  };

 
  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setOrderItems([]); 
    setThankYouMsg("🌿 Thank you for your order. Quality and freshness are our promise ✨");

       setTimeout(() => {
      navigate("/menu");
    }, 5000);
  };

   const handleGoBack = () => {
    navigate("/menu", { state: { items: orderItems } });
  };

  return (
    <div className="order-container">
      <h2>Your Order</h2>

      {thankYouMsg ? (
        <div className="thankyou-box">{thankYouMsg}</div>
      ) : orderItems.length === 0 ? (
        <p>No items added yet!</p>
      ) : (
        <>
          <ul className="order-list">
            {Object.entries(itemCounts).map(([name, count]) => {
              const price = orderItems.find(i => i.name === name)?.price || 0;
              return (
                <li key={name} className="order-item">
                  <span>{name} × {count}</span>
                  <span>₹{price * count}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(name)}
                  >
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="total-box">Total: ₹{total}</div>
          <div className="btn-group">
            <button className="back-btn" onClick={handleGoBack}>
              ⬅️ Back to Menu
            </button>
            <button className="place-btn" onClick={handlePlaceOrder}>
              ✅ Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Order;










