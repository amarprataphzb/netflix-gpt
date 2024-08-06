// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAivBTguqvfT7ohJighEcjwMZMZMNEBhw",
  authDomain: "netflixgpt-b7556.firebaseapp.com",
  projectId: "netflixgpt-b7556",
  storageBucket: "netflixgpt-b7556.appspot.com",
  messagingSenderId: "706755481389",
  appId: "1:706755481389:web:fe56e01670c15f9e038da4",
  measurementId: "G-WRLHL294N2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

