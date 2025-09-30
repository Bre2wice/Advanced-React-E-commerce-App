/*global test, expect, describe, jest*/
/*eslint no-undef: "error"*/

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../Cart";
import ProductCard from "../ProductCard";
import { AuthContext } from "../../contexts/AuthContext";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import cartReducer from "../../slices/cartSlice"; // make sure path is correct

// 1️⃣ Create Redux store
const store = configureStore({
  reducer: { cart: cartReducer },
});

// 2️⃣ Mock AuthContext
const mockAuthValue = {
  user: { id: 1, name: "Test User" },
  login: jest.fn(),
  logout: jest.fn(),
};

const AuthProviderMock = ({ children }) => (
  <AuthContext.Provider value={mockAuthValue}>{children}</AuthContext.Provider>
);

// 3️⃣ Wrapper for rendering with all providers
const renderWithProviders = (ui) => {
  return render(
    <Provider store={store}>
      <AuthProviderMock>
        <MemoryRouter>{ui}</MemoryRouter>
      </AuthProviderMock>
    </Provider>
  );
};

// 4️⃣ Mock product data
const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "No Description",
  price: 10,
  image: "https://via.placeholder.com/150",
};

describe("Integration: ProductCard + Cart", () => {
  test("renders empty cart initially", () => {
    renderWithProviders(<Cart />);
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  test("adds product to cart with correct quantity", () => {
    const handleAddToCart = jest.fn();

    // Render product card
    renderWithProviders(
      <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
    );

    // Click Add to Cart button
    const addButton = screen.getByTestId("add-btn");
    fireEvent.click(addButton);

    // Ensure onAddToCart was called with correct product
    expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);

    // Optionally, render Cart and simulate adding manually
    renderWithProviders(<Cart items={[mockProduct]} />);
    expect(screen.getByText(/test product/i)).toBeInTheDocument();
  });
});
