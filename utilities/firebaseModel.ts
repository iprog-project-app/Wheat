import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { PlaceFullSchema } from "@/constants/types";

interface user {
  name: string;
  email: string;
  imgUrl: string;
  friends: string[];
  favourites: PlaceFullSchema[];
  recentSearches: PlaceFullSchema[];
}

export const addUser = async (user: user, uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...user,
    });
    console.log("Document written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
