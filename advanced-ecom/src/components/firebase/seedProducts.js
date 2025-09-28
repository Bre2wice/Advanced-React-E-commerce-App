// src/firebase/seedProducts.js
import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

// Sample product data
const products = [
  {
    title: "Red T-Shirt",
    description: "Comfortable cotton t-shirt",
    price: 19.99,
    image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Red+T-Shirt",
    category: "Clothing",
  },
  {
    title: "Blue Jeans",
    description: "Stylish denim jeans",
    price: 49.99,
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue+Jeans",
    category: "Clothing",
  },
  {
    title: "Coffee Mug",
    description: "Ceramic mug for your morning coffee",
    price: 9.99,
    image: "https://via.placeholder.com/150/964B00/FFFFFF?text=Coffee+Mug",
    category: "Kitchen",
  },
];

// Function to seed products
async function seedProducts() {
  const productsCollection = collection(db, "products");
  for (const product of products) {
    try {
      await addDoc(productsCollection, product);
      console.log(`Added product: ${product.title}`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
  console.log("Seeding complete!");
}

// Run the seeding
seedProducts();
