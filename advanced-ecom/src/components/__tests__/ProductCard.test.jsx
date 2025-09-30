/*global test, expect, describe, jest*/
/*eslint no-undef: "error"*/

import React from "react";
import "@testing-library/jest-dom"; // <- important
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../ProductCard";
import { MemoryRouter } from "react-router-dom";

describe("ProductCard component", () => {
  const product = { id: 1, title: "Test Product", price: 10 };

  test("renders product information", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText(/test product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$10/)).toBeInTheDocument();
  });

  test("calls onAddToCart when Add to Cart button is clicked", () => {
    const onAddToCart = jest.fn();
    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>
    );

    const addButton = screen.getByText(/add to cart/i);
    fireEvent.click(addButton);

    // Update this to match current ProductCard behavior
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});
