// src/firebase/users.js
import { db } from "./config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

/**
 * Create a new user document in Firestore
 * @param {string} uid - Firebase Auth user ID
 * @param {object} userData - e.g., { name: "Brianna", email: "brianna@example.com" }
 */
export async function createUserDocument(uid, userData) {
  if (!uid) return;
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, userData);
    console.log("User document created:", uid);
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
}

/**
 * Get user document by UID
 * @param {string} uid
 * @returns user data or null
 */
export async function getUserDocument(uid) {
  if (!uid) return null;
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    throw error;
  }
}

/**
 * Update user document fields
 * @param {string} uid
 * @param {object} updates - fields to update
 */
export async function updateUserDocument(uid, updates) {
  if (!uid) return;
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, updates);
    console.log("User document updated:", uid);
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
}

/**
 * Delete user document
 * @param {string} uid
 */
export async function deleteUserDocument(uid) {
  if (!uid) return;
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    console.log("User document deleted:", uid);
  } catch (error) {
    console.error("Error deleting user document:", error);
    throw error;
  }
}
