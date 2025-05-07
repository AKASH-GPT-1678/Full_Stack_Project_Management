import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8vFQDqZL14bZs8Ms_aVR_eoZjQdMaF4s",
  authDomain: "my-first-firebase123.firebaseapp.com",
  projectId: "my-first-firebase123",
  storageBucket: "my-first-firebase123.firebasestorage.app",
  messagingSenderId: "727893928642",
  appId: "1:727893928642:web:cec99b8b7777954231a95b",
  measurementId: "G-PDBF25JM42"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);