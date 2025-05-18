import React, { useState } from "react";
import "./styles.css";

const initialItems = {
  Clothing: [
    { name: "T-shirts", packed: false },
    { name: "Jeans", packed: false },
    { name: "Jacket", packed: false },
  ],
  Toiletries: [
    { name: "Toothbrush", packed: false },
    { name: "Shampoo", packed: false },
    { name: "Towel", packed: false },
  ],
  Electronics: [
    { name: "Phone Charger", packed: false },
    { name: "Laptop", packed: false },
    { name: "Headphones", packed: false },
  ],
  Documents: [
    { name: "Passport", packed: false },
    { name: "Tickets", packed: false },
    { name: "ID Card", packed: false },
  ],
};

export default function PackingChecklist() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Clothing");

  const togglePacked = (category, index) => {
    const updatedCategory = items[category].map((item, i) =>
      i === index ? { ...item, packed: !item.packed } : item
    );
    setItems({ ...items, [category]: updatedCategory });
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return;
    const updatedItems = {
      ...items,
      [selectedCategory]: [...items[selectedCategory], { name: newItem, packed: false }],
    };
    setItems(updatedItems);
    setNewItem("");
  };

  return (
    <div className="container">
      <h1 className="title">🧳 Packing Checklist</h1>

      <div className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {Object.keys(items).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button onClick={handleAddItem}>Add</button>
      </div>

      {Object.entries(items).map(([category, itemList]) => (
        <div key={category} className="category-card">
          <h2 className="category-title">{category}</h2>
          <ul className="item-list">
            {itemList.map((item, index) => (
              <li key={index} className="item">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    onChange={() => togglePacked(category, index)}
                  />
                  <span className={item.packed ? "packed" : ""}>{item.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}