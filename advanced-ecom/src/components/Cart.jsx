// src/components/Cart.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, clearCart } from "../store/slices/cartSlice";
import useCartTotals from "../hooks/useCartTotals";
import { useAuth } from "../contexts/AuthContext.jsx";
import { createOrder } from "../firebase/orders";

export default function Cart({ onClose }) {
  const dispatch = useDispatch();
  const { items, totalItems, totalPrice } = useCartTotals();
  const { currentUser } = useAuth();

  const handleCheckout = async () => {
    if (!currentUser) {
      alert("Please log in to place an order.");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      // Map cart items to order structure expected by Firestore
      const orderItems = items.map((item) => ({
        name: item.title,
        price: item.price,
        qty: item.count,
        image: item.image,
      }));

      // Create order in Firebase
      await createOrder(currentUser.uid, orderItems, totalPrice);

      alert("Order placed successfully!");
      dispatch(clearCart());
      onClose();
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

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
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                marginBottom: "10px",
                alignItems: "center",
              }}
            >
              <img
                src={item.image || "https://via.placeholder.com/50"}
                alt={item.title}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "contain",
                  marginRight: "10px",
                }}
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://via.placeholder.com/50?text=No+Image")
                }
              />
              <div style={{ flex: 1 }}>
                <p>{item.title}</p>
                <p>
                  ${item.price} × {item.count}
                </p>
                <button onClick={() => dispatch(removeItem(item.id))}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr />
          <p>Total Items: {totalItems}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
}
