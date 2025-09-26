import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "./api/api";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store/slices/cartSlice";
import { Routes, Route } from "react-router-dom";

import Cart from "./components/Cart.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import "./index.css";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Fetch categories (for filter)
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Fetch products (home page only)
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  if (categoriesLoading || productsLoading) return <div>Loading...</div>;
  if (categoriesError || productsError) return <div>Error loading data.</div>;

  return (
    <>
      {/* Navbar now outside padded container */}
      <header>
        <h1>Advanced E-Commerce Store</h1>
        <button onClick={() => setShowCart(true)}>🛒 Cart {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}</button>
      </header>

      <div className="app" style={{ padding: "20px" }}>
        {showCart && <Cart onClose={() => setShowCart(false)} />}

        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div>
                {/* Category filter only on home page */}
                <div style={{ margin: "20px 0" }}>
                  <label>
                    Filter by Category:{" "}
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
                  </label>
                </div>

                <div className="products-grid">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            }
          />

          {/* Product Detail Route */}
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </div>
    </>
  );
}

