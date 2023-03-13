import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTty0w2FF4mMSP7pRWuMy5U2y2Dup8k40",
  authDomain: "arduino-day-registration.firebaseapp.com",
  projectId: "arduino-day-registration",
  storageBucket: "arduino-day-registration.appspot.com",
  messagingSenderId: "999183262512",
  appId: "1:999183262512:web:d7c0e728e26b9923dadef5",
  measurementId: "G-0QRQS9HQKD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export  {db,storage} ;