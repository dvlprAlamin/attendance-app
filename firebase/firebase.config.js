// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
// };
// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBAE11O_uMYUPclnstBPTU52Z3pVSDYegQ",
    authDomain: "qr-code-scanner-attendance.firebaseapp.com",
    projectId: "qr-code-scanner-attendance",
    storageBucket: "qr-code-scanner-attendance.appspot.com",
    messagingSenderId: "64925945071",
    appId: "1:64925945071:web:c3205fc30613a63e305f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };