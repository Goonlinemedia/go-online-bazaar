import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJtqblbNx7LUXQ9Gv_8Ptn28TGZEBeJlU",
  authDomain: "go-online-webiste.firebaseapp.com",
  projectId: "go-online-webiste",
  storageBucket: "go-online-webiste.firebasestorage.app",
  messagingSenderId: "646469729812",
  appId: "1:646469729812:web:60ad8fff5f32b6f3fbf101"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
