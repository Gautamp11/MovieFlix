import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FirebaseAuth from "@firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvyL-FtR0uxZS9Yoe80XSYQxPfNTlXdxE",
  authDomain: "movieverdiq.firebaseapp.com",
  projectId: "movieverdiq",
  storageBucket: "movieverdiq.firebasestorage.app",
  messagingSenderId: "750595283960",
  appId: "1:750595283960:web:12c46635eff6c61392140d",
  measurementId: "G-X04406PYY6",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let authInstance: Auth;
const getReactNativePersistence = (
  FirebaseAuth as typeof FirebaseAuth & {
    getReactNativePersistence?: (storage: typeof AsyncStorage) => unknown;
  }
).getReactNativePersistence;

try {
  authInstance =
    typeof getReactNativePersistence === "function"
      ? FirebaseAuth.initializeAuth(app, {
          persistence: getReactNativePersistence(AsyncStorage) as never,
        })
      : FirebaseAuth.initializeAuth(app);
} catch {
  authInstance = FirebaseAuth.getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);
