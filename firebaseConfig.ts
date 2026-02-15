import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvyL-FtR0uxZS9Yoe80XSYQxPfNTlXdxE",
  authDomain: "movieverdiq.firebaseapp.com",
  projectId: "movieverdiq",
  storageBucket: "movieverdiq.firebasestorage.app",
  messagingSenderId: "750595283960",
  appId: "1:750595283960:web:12c46635eff6c61392140d",
  measurementId: "G-X04406PYY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
