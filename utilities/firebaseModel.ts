import { collection, addDoc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig"; 

interface user {
    name: string,
    email: string,
    imgUrl: string,
    friends: string[],
    favourites: {
        id: string; // place_id
        title: string;
        imageUri: string;
        rating: number;
        location: string;
        isLiked: boolean;
        note?: string;
        description: string;
        price: '$' | '$$' | '$$$' | '$$$$';
        website: string;
    }[] 
}

export const addUser = async (user: user) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            ...user
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
} 
    