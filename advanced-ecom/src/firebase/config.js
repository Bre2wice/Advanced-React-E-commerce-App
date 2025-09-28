// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_BC0741WRr9BdHAOsy6OSFwGahCU-T6s",
  authDomain: "e-commerce-app-13045.firebaseapp.com",
  projectId: "e-commerce-app-13045",
  storageBucket: "e-commerce-app-13045.appspot.com",
  messagingSenderId: "418739785235",
  appId: "1:418739785235:web:e6cc6b1906fb1d04b939e6",
  // measurementId removed since not using Analytics
};

const app = initializeApp(firebaseConfig);

// Export Auth and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
