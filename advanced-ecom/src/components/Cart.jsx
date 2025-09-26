import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, clearCart } from "../store/slices/cartSlice";
import useCartTotals from "../hooks/useCartTotals";

export default function Cart({ onClose }) {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useCartTotals();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "400px",
        height: "100%",
        background: "#fff",
        boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
        padding: "20px",
        overflowY: "auto",
        zIndex: 100,
      }}
    >
      <button onClick={onClose} style={{ marginBottom: "10px" }}>
        Close
      </button>

      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          {items.map(item => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}
            >
              <img
                src={item.image || "https://via.placeholder.com/50"}
                alt={item.title}
                style={{ width: "50px", height: "50px", objectFit: "contain", marginRight: "10px" }}
                onError={e => (e.currentTarget.src = "https://via.placeholder.com/50?text=No+Image")}
              />
              <div style={{ flex: 1 }}>
                <p>{item.title}</p>
                <p>${item.price} × {item.count}</p>
                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </div>
            </div>
          ))}
          <hr />
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={() => dispatch(clearCart())}>Checkout</button>
        </>
      )}
    </div>
  );
}
