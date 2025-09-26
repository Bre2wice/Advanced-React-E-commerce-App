import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "../api/api";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  const { data: categories = [] } = useQuery(["categories"], fetchCategories, {
    staleTime: 3600000,
  });
  const { data: products = [] } = useQuery(["products", selectedCategory], () =>
    fetchProducts(selectedCategory)
  );

  return (
    <div className="home">
      <h1>Advanced E-Commerce Store</h1>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={(p) => dispatch(addItem(p))}
          />
        ))}
      </div>
    </div>
  );
}
