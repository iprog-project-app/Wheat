import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { StoreSchema, UserSchema } from "@/constants/types";
import useStore from "@/store/model";

export const addUser = async (user: UserSchema, uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...user,
    });
    console.log("Document written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchUser = async (uid: string) => {
  try {
    const userSnapshot = await getDoc(doc(db, "users", uid));
    const userData = userSnapshot.data();
    return userData as UserSchema;
  } catch (err) {
    console.error("Error fetching document: ", err);
  }
};

export const updateFirebase = async (storeState: StoreSchema) => {
  const uid = storeState.loggedInUserId;

  if (uid) {
    try {
      console.log("Updating...");
      const updateData = {
        friends: storeState.friends,
        recentSearches: storeState.recentSearches,
        favourites: storeState.favourites,
      };

      await updateDoc(doc(db, "users", uid), updateData);
      console.log("Done updating");
    } catch (err) {
      console.error("Failed to update firebase: ", err);
    }
  }
};
