import React, { useState, useEffect } from 'react';
import api from './api'; // adjust path if needed

function SmartCanteen() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  // Fetch menu items on mount
  useEffect(() => {
    api.get('/api/menu')
      .then(res => setMenu(res.data))
      .catch(err => console.error('Failed to fetch menu', err));
  }, []);

  // Add menu item to cart
  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  // Place order (simulate payment + submit)
  const placeOrder = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    api.post('/api/orders', { items: cart })
      .then(res => {
        setOrderId(res.data.id);
        alert('Order placed successfully!');
        setCart([]); // clear cart
        trackOrderStatus(res.data.id);
      })
      .catch(err => alert('Error placing order'));
  };

  // Track order status periodically
  const trackOrderStatus = (id) => {
    setOrderStatus('Pending');
    const interval = setInterval(() => {
      api.get(`/api/orders/${id}/status`)
        .then(res => {
          setOrderStatus(res.data.status);
          if (res.data.status === 'Delivered' || res.data.status === 'Cancelled') {
            clearInterval(interval);
          }
        })
        .catch(() => {
          clearInterval(interval);
          setOrderStatus('Unknown');
        });
    }, 5000); // Check every 5 seconds
  };

  return (
    <div>
      <h1>Smart Canteen Menu</h1>
      <ul>
        {menu.map(item =>
          <li key={item.id}>
            {item.name} - ₹{item.price}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        )}
      </ul>

      <h2>Cart ({cart.length} items)</h2>
      <ul>
        {cart.map((item, idx) => <li key={idx}>{item.name} - ₹{item.price}</li>)}
      </ul>

      <button onClick={placeOrder} disabled={cart.length === 0}>Place Order & Pay</button>

      {orderId &&
        <>
          <h3>Order Status</h3>
          <p>Order ID: {orderId}</p>
          <p>Status: {orderStatus}</p>
        </>
      }
    </div>
  );
}

export default SmartCanteen;
