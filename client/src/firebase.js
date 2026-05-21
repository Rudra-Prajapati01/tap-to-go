import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDHsm3vfq5NTwo5yAbwM2K4DZ-uYNwnSzA",
  authDomain: "tap-to-go-app.firebaseapp.com",
  projectId: "tap-to-go-app",
  storageBucket: "tap-to-go-app.firebasestorage.app",
  messagingSenderId: "69535428209",
  appId: "1:69535428209:web:e907a495c57faf9fecb5d0",
  measurementId: "G-P8LL1B7LCH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);