/* eslint-disable react-refresh/only-export-components */
// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  createUserDocument,
  getUserDocument,
  updateUserDocument,
  deleteUserDocument,
} from "../firebase/users";

// Create Auth Context
const AuthContext = createContext();

// Hook to use AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup
  async function signup(email, password, additionalData = {}) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await createUserDocument(user.uid, { email, ...additionalData });
    setCurrentUser(user);
    setUserData({ email, ...additionalData });
  }

  // Login
  async function login(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    setCurrentUser(user);
    const docData = await getUserDocument(user.uid);
    setUserData(docData);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Update Firestore profile
  async function updateProfile(updates) {
    if (!currentUser) return;
    await updateUserDocument(currentUser.uid, updates);
    setUserData((prev) => ({ ...prev, ...updates }));
  }

  // Delete account
  async function deleteAccount() {
    if (!currentUser) return;
    await deleteUserDocument(currentUser.uid);
    await currentUser.delete();
    setCurrentUser(null);
    setUserData(null);
  }

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const docData = await getUserDocument(user.uid);
        setUserData(docData);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    updateProfile,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
