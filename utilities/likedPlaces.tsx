// hjälpfunktion för att classifiera om en plats är liked eller inte
//Input: id => boolean ut (liked eller inte)
// Placeholder som användardata, byts ut när jag har tillgång till firebase

import useStore from "@/store/model";

export const isPlaceLiked = (placeId: string): boolean => {
    const { likedPlaces } = useStore(); // Kalla useStore här, på rätt nivå.
    const likedIds = likedPlaces.map(place => place.id);
    return likedIds.includes(placeId);
};




