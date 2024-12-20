import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_WHEAT_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = Platform.OS === "web"
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

export const db = getFirestore(app);
