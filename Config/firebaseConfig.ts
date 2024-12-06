import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.WHEAT_FIREBASE_APIKEY,
  authDomain: process.env.WHEAT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.WHEAT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.WHEAT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.WHEAT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.WHEAT_FIREBASE_APP_ID
};
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


