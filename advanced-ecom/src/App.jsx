import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "./api/api"; // ✅ Use API fetch
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./store/slices/cartSlice";
import { Routes, Route, Link } from "react-router-dom";

import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
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

  // Fetch categories
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
  });

  // Fetch products from API (with optional category)
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  // Add to cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  if (categoriesLoading || productsLoading) return <div>Loading...</div>;
  if (categoriesError || productsError) return <div>Error loading data.</div>;

  return (
    <>
      <header>
        <h1>
          <Link to="/">Advanced E-Commerce Store</Link>
        </h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Sign Up</Link> |{" "}
          <Link to="/orders">Order History</Link>
          <button onClick={() => setShowCart(true)}>
            🛒 Cart{" "}
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </nav>
      </header>

      <div className="app" style={{ padding: "20px" }}>
        {showCart && <Cart onClose={() => setShowCart(false)} />}

        <Routes>
          <Route
            path="/"
            element={
              <div>
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
                  {products.length === 0 ? (
                    <p>No products found.</p>
                  ) : (
                    products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))
                  )}
                </div>
              </div>
            }
          />

          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </div>
    </>
  );
}
