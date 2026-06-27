import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAo0n_k9B5Ra2cMtZEFACRyos453m2pyWw",
  authDomain: "obelii-1b021.firebaseapp.com",
  projectId: "obelii-1b021",
  storageBucket: "obelii-1b021.firebasestorage.app",
  messagingSenderId: "271388164732",
  appId: "1:271388164732:web:544b0d6367f8d66670bff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
