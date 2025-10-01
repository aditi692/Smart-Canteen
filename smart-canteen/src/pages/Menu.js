import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";   
import "../Styles/Menu.css";

function Menu({ orderItems, setOrderItems, inventory, setInventory }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (location.state?.items) {
      setOrderItems(location.state.items);
    }
  }, [location.state, setOrderItems]);

  const menuItems = [
    { id: 1, name: "Veg Burger", price: 50, color: "#FFB6C1", image: "/images/burger.png" },
    { id: 2, name: "Pizza", price: 120, color: "#ADD8E6", image: "/images/pizza.png" },
    { id: 3, name: "Pasta", price: 90, color: "#90EE90", image: "/images/pasta.png" },
    { id: 4, name: "Sandwich", price: 60, color: "#FFD700", image: "/images/sandwich.png" },
    { id: 5, name: "Fries", price: 40, color: "#FFA07A", image: "/images/fries.png" },
    { id: 6, name: "Cold Drink", price: 20, color: "#87CEFA", image: "/images/cold drink.png" }
  ];


  const handleAdd = (item) => {
    const invItem = inventory.find((i) => i.id === item.id);

    if (!invItem || invItem.stock <= 0) {
      alert("❌ Item out of stock!");
      return;
    }

    setOrderItems((prev) => [...prev, item]);

    setInventory((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, stock: i.stock - 1 } : i
      )
    );
  };

  const handleRemove = (name) => {
    const index = orderItems.findIndex((i) => i.name === name);
    if (index !== -1) {
      const itemToRemove = orderItems[index];

     
      setInventory((prev) =>
        prev.map((i) =>
          i.id === itemToRemove.id ? { ...i, stock: i.stock + 1 } : i
        )
      );

      const newItems = [...orderItems];
      newItems.splice(index, 1);
      setOrderItems(newItems);
    }
  };

  const handlePlaceOrder = () => {
    if (orderItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    navigate("/order", { state: { items: orderItems } });

    setOrderPlaced(true);
    
  };


  const totalPrice = orderItems.reduce((sum, item) => sum + item.price, 0);

 
  const groupedItems = orderItems.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { count: 0, price: item.price };
    }
    acc[item.name].count += 1;
    return acc;
  }, {});

  return (
    <div className="menu-page">   
      {/* Menu Section */}
      <div className="menu-container">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="menu-item"
            style={{ backgroundColor: item.color }}
          >
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button className="add-btn" onClick={() => handleAdd(item)}>
              ➕ Add to Cart
            </button>
            <p className="stock">
              Stock: {inventory.find((i) => i.id === item.id)?.stock}
            </p>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      <div className="cart-box">
        <h3>🛒 Your Cart</h3>
        {orderItems.length > 0 ? (
          <>
            <ul>
              {Object.entries(groupedItems).map(([name, { count, price }]) => (
                <li key={name}>
                  <span>{name} × {count}</span>
                  <span>₹{price * count}</span>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(name)}
                  >
                    ❌ Remove
                  </button>
                </li>
              ))}
            </ul>
            <h4>Total: ₹{totalPrice}</h4>
            <button className="place-btn" onClick={handlePlaceOrder}>
              ✅ Place Order
            </button>
          </>
        ) : (
          <p style={{ color: "white" }}>Cart is empty</p>
        )}
      </div>

      {/* Thank You Box */}
      {orderPlaced && (
        <div className="thankyou-box">
          🎉 Redirecting to order confirmation... 🍽
        </div>
      )}
    </div>
  );
}

export default Menu;












