function Inventory({ inventory }) {
  return (
    <div style={{ padding: "20px", color: "white", textAlign: "right" }}>
      <h1>Inventory Page</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {inventory.map(item => (
          <li key={item.id}>
            {item.name} - Stock: {item.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;



