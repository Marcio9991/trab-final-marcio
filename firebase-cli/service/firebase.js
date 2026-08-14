import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfULUl1CYc_-Yo4dNlZ0jcCw2EZ3aOvTI",
  authDomain: "receitas-6737a.firebaseapp.com",
  projectId: "receitas-6737a",
  storageBucket: "receitas-6737a.firebasestorage.app",
  messagingSenderId: "104420393379",
  appId: "1:104420393379:web:5ea3f8c7bf2f8cb16d1a16",
  measurementId: "G-7Q89L9QDET"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);