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
  setLikedPlaces: (places: PlaceFullSchema[]) => set({likedPlaces: places}),
  removeLikedPlace: (id: string) => {
    const currentLikedPlaces = get().likedPlaces;
    const updatedLikedPlaces = currentLikedPlaces.filter(place => place.id !== id);
    if (updatedLikedPlaces.length === currentLikedPlaces.length){
      console.warn(`Tried to remove place that was not in likedPlaces, with id: ${id}`)
    }
    set({ likedPlaces: updatedLikedPlaces });
  },

    addLikedPlace: (place: PlaceFullSchema) => {
      const currentLikedPlaces = get().likedPlaces;

      // Kontrollera om platsen redan finns i listan baserat på id
      const exists = currentLikedPlaces.some(existingPlace => existingPlace.id === place.id);
      if (exists) {
          console.warn(`Place with id ${place.id} already exists in likedPlaces.`);
          return; // Om den redan finns, gör inget
      }

      // Lägg till platsen om den inte redan finns
      const updatedLikedPlaces = [...currentLikedPlaces, place];
      set({ likedPlaces: updatedLikedPlaces });
  },
    isLikedPlace: (id: string) => {
      const likedIds = get().likedPlaces.map(place => place.id)
      return likedIds.includes(id);
    }
}));

export default useStore;