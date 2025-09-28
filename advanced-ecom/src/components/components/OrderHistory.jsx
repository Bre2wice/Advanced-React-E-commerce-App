import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { fetchUserOrders } from "../firebase/orders";

export default function OrderHistory() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (currentUser) {
        const userOrders = await fetchUserOrders(currentUser.uid);
        setOrders(userOrders);
      }
      setLoading(false);
    }
    loadOrders();
  }, [currentUser]);

  if (loading) return <p>Loading orders...</p>;
  if (!currentUser) return <p>Please log in to see your order history.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            style={{
              marginBottom: "1.5rem",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {order.createdAt?.toDate().toLocaleString() || "Unknown"}
            </p>
            <p>
              <strong>Total:</strong> ${order.total.toFixed(2)}
            </p>
            <details>
              <summary>View Products</summary>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title || item.name} (x{item.qty || item.quantity}) - $
                    {item.price}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))
      )}
    </div>
  );
}
