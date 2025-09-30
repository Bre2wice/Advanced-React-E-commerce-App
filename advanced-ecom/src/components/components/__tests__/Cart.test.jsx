/*global test, expect, describe, jest*/
/*eslint no-undef: "error"*/
// src/components/__tests__/Cart.test.jsx
import "@testing-library/jest-dom";

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../../slices/cartSlice";
import Cart from "../Cart";

// Mock useAuth hook
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    currentUser: { uid: "123", email: "test@example.com" }, // mock user
  }),
}));

function renderCartWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );
}

describe("Cart component", () => {
  test("displays empty cart message", () => {
    renderCartWithStore({ cart: { items: [] } });
    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  test("removes an item when Remove button is clicked", () => {
    const initialState = {
      cart: { items: [{ id: 1, title: "Test", price: 10, count: 1 }] },
    };
    renderCartWithStore(initialState);

    const removeButton = screen.getByText(/remove/i);
    fireEvent.click(removeButton);

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });
});
