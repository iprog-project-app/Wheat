import { PlaceFullSchema, UserSchema } from "@/constants/types";
import { create } from "zustand";
import { StoreSchema } from "@/constants/types";

export const useStore = create<StoreSchema>((set, get) => ({
  loggedInUserId: null,
  name: "",
  email: "",
  imgUrl: "",
  friends: [],
  likedPlaces: [],
  recentSearches: [],

  setLoggedInUserId: (uid: string) => {
    set({ loggedInUserId: uid });
  },

  setUser: (user: UserSchema | undefined) => {
    set((state) => ({
      ...state,
      ...user,
    }));
  },

  activePlaceData: null,
  setActivePlaceData: (place: PlaceFullSchema) =>
    set({ activePlaceData: place }),
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  searchResultsData: [],
  setSearchResultsData: (data: PlaceFullSchema[]) =>
    set({ searchResultsData: data }),
  setLikedPlaces: (places: PlaceFullSchema[]) => set({ likedPlaces: places }),
  removeLikedPlace: (id: string) => {
    const currentLikedPlaces = get().likedPlaces;
    const updatedLikedPlaces = currentLikedPlaces.filter(
      (place) => place.id !== id
    );
    if (updatedLikedPlaces.length === currentLikedPlaces.length) {
      console.warn(
        `Tried to remove place that was not in likedPlaces, with id: ${id}`
      );
    }
    set({ likedPlaces: updatedLikedPlaces });
  },

  addLikedPlace: (place: PlaceFullSchema) => {
    const currentLikedPlaces = get().likedPlaces;

    // Kontrollera om platsen redan finns i listan baserat på id
    const exists = currentLikedPlaces.some(
      (existingPlace) => existingPlace.id === place.id
    );
    if (exists) {
      console.warn(`Place with id ${place.id} already exists in likedPlaces.`);
      return; // Om den redan finns, gör inget
    }

    // Lägg till platsen om den inte redan finns
    const updatedLikedPlaces = [...currentLikedPlaces, place];
    set({ likedPlaces: updatedLikedPlaces });
  },
  isLikedPlace: (id: string) => {
    const likedIds = get().likedPlaces.map((place) => place.id);
    return likedIds.includes(id);
  },
  idToItem(id: string) {
    return get().likedPlaces.find((item) => item.id === id);
  },
  handleToggleLike: (id: string) => {
    const { idToItem, isLikedPlace, removeLikedPlace, addLikedPlace } = get(); // Destructure the functions
    const place = idToItem(id); // Get place using idToItem
    if (isLikedPlace(id)) {
      removeLikedPlace(id); // Remove place if liked
    } else {
      if (place) {
        addLikedPlace(place); // Add place if not liked
      } else {
        console.error(
          `Could not find place from id: ${id} when adding to saved places.`
        );
      }
    }
  },
}));

export default useStore;
