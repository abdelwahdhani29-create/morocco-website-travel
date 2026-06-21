import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { 
  initializeFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATze_yQfxEVzQcdMy709JfAZjjIVUo0MI",
  authDomain: "poetic-coast-ns7sz.firebaseapp.com",
  projectId: "poetic-coast-ns7sz",
  storageBucket: "poetic-coast-ns7sz.firebasestorage.app",
  messagingSenderId: "413939711143",
  appId: "1:413939711143:web:5c93daa9351a26d4ea2f82"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom database ID
const db = initializeFirestore(app, {}, "ai-studio-31ca8091-f2e2-4ae4-a29d-833decdb7f2d");

// Initialize Auth and Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  db,
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
};
