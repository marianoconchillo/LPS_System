import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCSCxXSQk_Nf9MSv0h6Gx9bcfE3Ew7e3iA",
    authDomain: "lps-auth.firebaseapp.com",
    projectId: "lps-auth",
    storageBucket: "lps-auth.appspot.com",
    messagingSenderId: "248881118523",
    appId: "1:248881118523:web:5b174d90a1ecf7573e0b1e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);