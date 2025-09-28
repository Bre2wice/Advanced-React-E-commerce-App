import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  onAddToCart,
  onUpdate,
  onDelete,
}) {
  const [added, setAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: product.title || product.name || "No Title",
    description: product.description || "No Description",
    price: product.price || 0,
  });

  const capitalizeSentences = (text) =>
    text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const handleAddClick = () => {
    if (onAddToCart) onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(product.id, {
        title: editData.title,
        description: editData.description,
        price: parseFloat(editData.price),
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="product-card">
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleChange}
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={editData.price}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={
                product.image ||
                product.imageUrl ||
                "https://via.placeholder.com/150"
              }
              alt={product.title || product.name || "Product"}
              onError={(e) =>
                (e.currentTarget.src =
                  "https://via.placeholder.com/150?text=No+Image")
              }
            />
            <h3>{capitalizeSentences(editData.title)}</h3>
            <p>{capitalizeSentences(editData.description)}</p>
            <p className="price">${editData.price.toFixed(2)}</p>
          </Link>
          <button onClick={handleAddClick}>
            {added ? "Added!" : "Add to Cart"}
          </button>
          {onUpdate && <button onClick={() => setIsEditing(true)}>Edit</button>}
          {onDelete && (
            <button onClick={() => onDelete(product.id)}>Delete</button>
          )}
        </>
      )}
    </div>
  );
}
