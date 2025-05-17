import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQhuwDekAfzuDx2hmrku3TtUcofolINwc",
  authDomain: "learn-lingo-62600.firebaseapp.com",
  databaseURL:
    "https://learn-lingo-62600-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "learn-lingo-62600",
  storageBucket: "learn-lingo-62600.firebasestorage.app",
  messagingSenderId: "863208209777",
  appId: "1:863208209777:web:6aaea0f1b381ece47bcad0",
  measurementId: "G-VQKGXPNY2M",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
