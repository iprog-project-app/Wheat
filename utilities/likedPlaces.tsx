// hjälpfunktion för att classifiera om en plats är liked eller inte
//Input: id => boolean ut (liked eller inte)
// Placeholder som användardata, byts ut när jag har tillgång till firebase
import { PlaceFullSchema } from "@/constants/types";

export const isPlaceLiked = (placeId: string, likedPlaces: PlaceFullSchema[]): boolean => {
    return likedPlaces.some((place) => place.id === placeId);
};



