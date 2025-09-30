/*global jest*/
/*eslint no-undef: "error"*/

// jest.setup.js

import "whatwg-fetch"; // fetch polyfill for Firebase

// Mock Firebase modules
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(null);
    return jest.fn(); // unsubscribe function
  }),
}));

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
}));

// Correct mock path
jest.mock("./src/firebase/users.js", () => ({
  createUserDocument: jest.fn(),
  getUserDocument: jest.fn(() => ({})),
  updateUserDocument: jest.fn(),
  deleteUserDocument: jest.fn(),
}));
