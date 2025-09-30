import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const [added, setAdded] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;
  if (!product) return <p>Product not found.</p>;

  // Capitalize first letter of each sentence
  const capitalizeSentences = (text) =>
    text.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // reset feedback after 2s
  };

  return (
    <div
      className="product-detail"
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.title}
        style={{
          width: "300px",
          height: "300px",
          objectFit: "contain",
          margin: "0 auto 20px auto",
          display: "block",
        }}
        onError={(e) =>
          (e.currentTarget.src =
            "https://via.placeholder.com/300?text=No+Image")
        }
      />
      <h2>{product.title}</h2>
      <p className="price">${product.price.toFixed(2)}</p>
      <p>{capitalizeSentences(product.description)}</p>
      <button
        onClick={handleAdd}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#1e90ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
      {added && (
        <p style={{ color: "green", marginTop: "10px" }}>Added to Cart!</p>
      )}
    </div>
  );
}
