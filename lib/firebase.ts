import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjmHPNtO7cweEJEWFCCGHs0_6Ezv74tCQ",
  authDomain: "unimove-dz.firebaseapp.com",
  projectId: "unimove-dz",
  storageBucket: "unimove-dz.firebasestorage.app",
  messagingSenderId: "466828320611",
  appId: "1:466828320611:web:c39c5327e0c07a6f9e7d56",
  measurementId: "G-RT3FMXME6Z",
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);

export default firebaseApp;