// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrtd_AGT9p_7W58BbAAfM8NlSmm8Z9mgc",
  authDomain: "worktest-116d3.firebaseapp.com",
  projectId: "worktest-116d3",
  storageBucket: "worktest-116d3.firebasestorage.app",
  messagingSenderId: "931488070488",
  appId: "1:931488070488:web:d513d386b31e1f9ba5432d",
  measurementId: "G-C3L3QKX4DL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
