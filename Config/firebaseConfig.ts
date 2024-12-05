import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACMfLFTxyqEGVJYWqzXaCBygzrrKQOQXo",
  authDomain: "wheat-9b954.firebaseapp.com",
  projectId: "wheat-9b954",
  storageBucket: "wheat-9b954.firebasestorage.app",
  messagingSenderId: "977031012598",
  appId: "1:977031012598:web:66ff746c4e9d6b16e14cd7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

// IOS client ID: 1001708917415-2vf56juoiu0g0bi8ctpi5fn3r61pf7l5.apps.googleusercontent.com
// Android client ID: 1001708917415-ocvpdnilkd5kr2218gt05fcppa27p6ul.apps.googleusercontent.com
