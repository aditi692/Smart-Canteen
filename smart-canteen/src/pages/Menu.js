import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

const recommended = [
  { id: 1, img: "/images/vadapav.jpg", name: "Vada Pav" },
  { id: 2, img: "/images/Burger.png", name: "Burger" },
  { id: 3, img: "/images/pasta.png", name: "Pasta" },
];

const categories = [
  {
    id: 1,
    name: "South Indian",
    desc: "Dosa, Idli, Uttapam...",
    img: "/images/south indian.jpg",
    rating: 4.1,
    items: [
      { id: 101, name: "Dosa", price: 50, img: "/images/dosa.jpg" },
      { id: 102, name: "Idli", price: 30, img: "/images/idli.jpg" },
      { id: 103, name: "Uttapam", price: 45, img: "/images/uttapam.jpg" }
    ]
  },
  {
    id: 2,
    name: "Parathas",
    desc: "Aloo, Paneer, Mix Veg...",
    img: "/images/parathas.jpg",
    rating: 4.3,
    items: [
      { id: 201, name: "Aloo Paratha", price: 40, img: "/images/aloo-paratha.jpg" },
      { id: 202, name: "Paneer Paratha", price: 60, img: "/images/paneer-paratha.jpg" }
    ]
  },
  {
    id: 3,
    name: "Snacks",
    desc: "Samosa, Sandwich, Fries...",
    img: "/images/snacks.jpg",
    rating: 4.2,
    items: [
      { id: 301, name: "Samosa", price: 20, img: "/images/samosa.jpg" },
      { id: 302, name: "Sandwich", price: 35, img: "/images/sandwich.jpg" },
      { id: 303, name: "Fries", price: 30, img: "/images/fries.jpg" }
    ]
  },
  {
    id: 4,
    name: "Maggies",
    desc: "Masala Maggi, Cheese Maggi...",
    img: "/images/maggie.jpg",
    rating: 4.7,
    items: [
      { id: 401, name: "Masala Maggi", price: 35, img: "/images/masala-maggi.jpg" },
      { id: 402, name: "Cheese Maggi", price: 45, img: "/images/cheese-maggi.jpg" }
    ]
  },
  {
    id: 5,
    name: "Chinese",
    desc: "Noodles, Manchurian...",
    img: "/images/chinnies noodles.jpg",
    rating: 4.0,
    items: [
      { id: 501, name: "Noodles", price: 60, img: "/images/noodles.jpg" },
      { id: 502, name: "Manchurian", price: 70, img: "/images/manchurian.jpg" }
    ]
  },
  {
    id: 6,
    name: "Drinks",
    desc: "Cold Drink, Juice, Coffee...",
    img: "/images/drinks.jpg",
    rating: 4.5,
    items: [
      { id: 601, name: "Cold Drink", price: 20, img: "/images/cold-drink.jpg" },
      { id: 602, name: "Juice", price: 25, img: "/images/juice.jpg" },
      { id: 603, name: "Coffee", price: 30, img: "/images/coffee.jpg" }
    ]
  },
  {
    id: 7,
    name: "Desserts",
    desc: "Ice Cream, Gulab Jamun...",
    img: "/images/dessert.jpg",
    rating: 4.6,
    items: [
      { id: 701, name: "Ice Cream", price: 40, img: "/images/ice-cream.jpg" },
      { id: 702, name: "Gulab Jamun", price: 35, img: "/images/gulab-jamun.jpg" }
    ]
  },
];

export default function Menu({ orderItems = [], setOrderItems = () => {} }) {
  const [selectedCat, setSelectedCat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleAdd = (item) => {
    setOrderItems([...orderItems, item]);
    navigate("/order");
  };

  const recommendedWithPrice = recommended.map(item => ({ ...item, price: 40 + (item.id - 1) * 20 }));
  const allItems = [...recommendedWithPrice, ...categories.flatMap(cat => cat.items)];
  const filteredItems = searchTerm ? allItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];

  return (
    <div className="menu-bg">
      <div className="menu-header">
        <div className="menu-search">
          <input type="text" placeholder="Search dish" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
        </div>
        <div className="menu-banner">
          <div>
            <h3>ORDER WITHIN SECONDS VIA<br />UPI PAYMENT</h3>
            <p>Choose your favorite item and complete the order within seconds</p>
            <button>Choose</button>
          </div>
          <img src="/images/banner.png" alt="Banner" />
        </div>
      </div>

      {searchTerm && (
        <div className="menu-section">
          <h4>Search Results for "{searchTerm}"</h4>
          <div className="menu-items-list">
            {filteredItems.length > 0 ? filteredItems.map(item => (
              <div className="menu-item-card" key={item.id}>
                <img src={item.img} alt={item.name} className="item-img" />
                <span>{item.name} - ₹{item.price}</span>
                <button onClick={() => handleAdd(item)}>Add</button>
              </div>
            )) : <p>No items found for "{searchTerm}".</p>}
          </div>
        </div>
      )}

      {!selectedCat && !searchTerm && (
        <>
          <div className="menu-section">
            <h4>Recommended for you</h4>
            <div className="menu-recommended">
              {recommended.map(item => (
                <div className="menu-reco-card" key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="menu-section">
            <h4>Categories</h4>
            <div className="menu-categories">
              {categories.map(cat => (
                <div
                  className="menu-cat-card"
                  key={cat.id}
                  onClick={() => setSelectedCat(cat)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={cat.img} alt={cat.name} />
                  <div>
                    <div className="cat-title">{cat.name}</div>
                    <div className="cat-desc">{cat.desc}</div>
                    <div className="cat-rating">★ {cat.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedCat && (
        <div className="menu-section">
          <h4>{selectedCat.name} Items</h4>
          <div className="menu-items-list">
            {selectedCat.items.map(item => (
              <div className="menu-item-card" key={item.id}>
                <img src={item.img} alt={item.name} className="item-img" />
                <span>{item.name} - ₹{item.price}</span>
                <button onClick={() => handleAdd(item)}>Add</button>
              </div>
            ))}
          </div>
          <button className="back-btn" onClick={() => setSelectedCat(null)}>Back to Categories</button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

// Bottom navigation component
function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav">
      <button onClick={() => navigate("/menu")}>Home</button>
      <button onClick={() => navigate("/order")}>Cart</button>
      <button onClick={() => navigate("/profile")}>Profile</button>
    </nav>
  );
}