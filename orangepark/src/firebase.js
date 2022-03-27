import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAV_DMGt__Z5VFgNZ0xz1DlIWMJNH_fK6E",
  authDomain: "cowboys-f0891.firebaseapp.com",
  projectId: "cowboys-f0891",
  storageBucket: "cowboys-f0891.appspot.com",
  messagingSenderId: "46207808243",
  appId: "1:46207808243:web:d0448f6b81c2c93c9a3d86",
  measurementId: "G-P9GY43YFM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}