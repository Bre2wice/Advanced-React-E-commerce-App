import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const [added, setAdded] = useState(false);

  // Capitalize first letter of each sentence
  const capitalizeSentences = (text) =>
    text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const handleAddClick = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500); // reset button text after 1.5 seconds
  };

  return (
    <div className="product-card">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={product.image || "https://via.placeholder.com/150"}
          alt={product.title}
          onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/150?text=No+Image")
          }
        />
        <h3>{capitalizeSentences(product.title)}</h3>
        <p>{capitalizeSentences(product.description)}</p>
        <p className="price">${product.price.toFixed(2)}</p>
      </Link>
      <button onClick={handleAddClick}>{added ? "Added!" : "Add to Cart"}</button>
    </div>
  );
}
