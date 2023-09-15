// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCt_ekiu3UHzMbor-TscgyYqK4dbzn7A0",
  authDomain: "blog-for-my-project.firebaseapp.com",
  projectId: "blog-for-my-project",
  storageBucket: "blog-for-my-project.appspot.com",
  messagingSenderId: "817932726469",
  appId: "1:817932726469:web:e46601fec2d8136ceb40ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
