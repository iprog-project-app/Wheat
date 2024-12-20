import {
  updateDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
  query,
  collection,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { FriendSchema, PlaceFullSchema } from "@/constants/types";
import { UserSchema } from "@/constants/types";
import { StoreSchema } from "@/model/storeModel";

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
        likedPlaces: storeState.likedPlaces,
      };

      await updateDoc(doc(db, "users", uid), updateData);
      console.log("Done updating");
    } catch (err) {
      console.error("Failed to update firebase: ", err);
    }
  }
};

// Searches firestore for user emails based on search query,
// Input: a string
// Output: An array with all users on format {id: sdasfasm, name: Samuel, email: sam@gmail.com}
//         with an email that contais the input string.

export const friendsSearch = async (searchQuery: string) => {
  const extractFriendData = (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    return {
      name: data.name,
      email: data.email,
      userId: snapshot.id,
    } as FriendSchema;
  };

  try {
    const ref = collection(db, "users");
    const q = query(
      ref,
      where("email", ">=", searchQuery.toLowerCase()),
      where("email", "<", searchQuery.toLowerCase() + "\uf8ff")
    );
    const q2 = query(
      ref,
      where("name", ">=", searchQuery.toLowerCase()),
      where("name", "<", searchQuery.toLowerCase() + "\uf8ff")
    );
    const [userSnapshotsByEmail, userSnapshotsByName] = await Promise.all([getDocs(q), getDocs(q2)]);
    const userDataByEmail = userSnapshotsByEmail.docs.map(extractFriendData);
    const userDataByName = userSnapshotsByName.docs.map(extractFriendData);
    const userData = [...userDataByEmail, ...userDataByName];
    const uniqueUserData = Array.from(new Map(userData.map(item => [item.userId, item])).values());
    return uniqueUserData;
  } catch (err) {
    console.error("Error fetching document: ", err);
  }
};

// Converts a user id to an array with all ther liked places according to likedplacesSchema
// Input: a string (user id)
// Output: An array with their liked places e.g. [{likedPlace1}, {likedPlace2}]

export const idToLikedPlaces = async (uid: string): Promise<PlaceFullSchema[]> => {
  try {
    const ref = doc(db, "users", uid);
    const snapshot = await getDoc(ref);
    const userData = snapshot.data();
    if (userData) {
      return userData.likedPlaces as PlaceFullSchema[];
    }
  } catch (err) {
    console.log(err);
  }
  return [];
};
