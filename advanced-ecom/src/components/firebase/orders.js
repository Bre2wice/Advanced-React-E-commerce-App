// src/firebase/orders.js
import { db } from "./config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

/**
 * Create a new order for a user
 * @param {string} userId
 * @param {Array} items - [{ name, price, qty, image }]
 * @param {number} total - total price of order
 */
export async function createOrder(userId, items, total) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      userId,
      items,
      total,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, items, total };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/**
 * Fetch all orders for a specific user
 * @param {string} userId
 */
export async function fetchUserOrders(userId) {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
