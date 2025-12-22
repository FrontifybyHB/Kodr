// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCR2WGgwkfgaVUMnGWoQQnbSS4vkaSaP7A",
    authDomain: "kodr-1e65c.firebaseapp.com",
    projectId: "kodr-1e65c",
    storageBucket: "kodr-1e65c.firebasestorage.app",
    messagingSenderId: "764123046680",
    appId: "1:764123046680:web:647f88598d98fa758a746d",
    measurementId: "G-7J02XVLJZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app };