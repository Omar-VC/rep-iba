// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfIiWda3hG4Fx3evFSFzDKCKrrxR9A_NA",
  authDomain: "rep-iba.firebaseapp.com",
  projectId: "rep-iba",
  storageBucket: "rep-iba.firebasestorage.app",
  messagingSenderId: "242253995082",
  appId: "1:242253995082:web:b7c23297a3088f83b21ab3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que vas a usar
export const auth = getAuth(app);
export const db = getFirestore(app);
