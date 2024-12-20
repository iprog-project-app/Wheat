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
  or,
  and,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { FriendSchema, PlaceFullSchema } from "@/constants/types";
import { UserSchema } from "@/constants/types";
import { StoreSchema } from "@/model/model";

export const addUser = async (user: UserSchema, uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...user,
      queryName: user.name.toLowerCase(),
      email: user.email.toLowerCase(),
    });
    console.log("Document written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const nameConvert = (name: string) => {
  const nameReducer = (acc: string, name: string) => {
    return (acc += name[0].toUpperCase() + name.slice(1) + " ");
  };
  const caseCorrectName = name.split(" ").reduce(nameReducer, "").slice(0, -1);
  return caseCorrectName;
};

export const fetchUser = async (uid: string) => {
  try {
    const userSnapshot = await getDoc(doc(db, "users", uid));
    const userData = userSnapshot.data();
    if (userData) {
      const { queryName, ...dataWithouthQuery } = userData;
      return dataWithouthQuery as UserSchema;
    }
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

export const friendsSearch = async (
  searchQuery: string,
  currentUser: string
) => {
  const extractFriendData = (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data();
    return {
      name: data.name,
      email: data.email,
      userId: snapshot.id,
    } as FriendSchema;
  };

  const filterCurrentUser = (user: FriendSchema) => {
    return user.email !== currentUser;
  };

  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    try {
      const ref = collection(db, "users");
      const q = query(
        ref,
        or(
          and(
            where("email", ">=", searchLower),
            where("email", "<", searchLower + "\uf8ff")
          ),
          and(
            where("queryName", ">=", searchLower),
            where("queryName", "<", searchLower + "\uf8ff")
          )
        )
      );
      const userSnapshots = await getDocs(q);
      const userData = userSnapshots.docs
        .map(extractFriendData)
        .filter(filterCurrentUser);
      return userData;
    } catch (err) {
      console.error("Error fetching document: ", err);
    }
  } else {
    return [];
  }
};

// Converts a user id to an array with all ther liked places according to likedplacesSchema
// Input: a string (user id)
// Output: An array with their liked places e.g. [{likedPlace1}, {likedPlace2}]

export const idToLikedPlaces = async (
  uid: string
): Promise<PlaceFullSchema[]> => {
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
