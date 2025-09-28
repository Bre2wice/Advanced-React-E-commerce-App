// src/firebase/products.js
import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

/**
 * Fetch all products, optional category filter
 */
export async function fetchProducts(category = "") {
  try {
    const snapshot = await getDocs(productsCollection);
    let products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Map Firestore fields to match ProductCard
    products = products.map((p) => ({
      id: p.id,
      title: p.name || p.title,
      description: p.description || "",
      price: p.price || 0,
      image: p.imageUrl || p.image || "https://via.placeholder.com/150",
      category: p.category || "",
    }));

    // Filter by category if selected
    if (category) {
      products = products.filter((p) => p.category === category);
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Create a new product
 */
export async function createProduct(productData) {
  try {
    const docRef = await addDoc(productsCollection, productData);
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

/**
 * Update a product
 */
export async function updateProduct(productId, updates) {
  try {
    const docRef = doc(db, "products", productId);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * Delete a product
 */
export async function deleteProduct(productId) {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
