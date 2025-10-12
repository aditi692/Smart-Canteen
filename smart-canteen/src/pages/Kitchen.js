import React from "react";

export default function Kitchen({ orders, setOrders }) {
  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Kitchen Staff Portal</h2>
      <h3>Orders</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
            <h4>Order #{order.id}</h4>
            <p>Status: {order.status}</p>
            <ul>
              {order.items.map((item, idx) => (
                <li key={idx}>{item.name} x {item.qty}</li>
              ))}
            </ul>
            <p>Total: ₹{order.total}</p>
            <div>
              <button onClick={() => updateStatus(order.id, "PREPARING")} disabled={order.status !== "PLACED"}>Start Preparing</button>
              <button onClick={() => updateStatus(order.id, "READY")} disabled={order.status !== "PREPARING"}>Mark Ready</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
