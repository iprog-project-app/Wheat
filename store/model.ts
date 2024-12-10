import { FriendSchema, PlaceFullSchema } from '@/constants/types';
import { create } from 'zustand';
//Mock data



interface StoreState {
    activePlaceData: PlaceFullSchema | null;
    setActivePlaceData: (place: PlaceFullSchema) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResultsData: PlaceFullSchema[];
    setSearchResultsData: (data: PlaceFullSchema[]) => void;
    likedPlaces: PlaceFullSchema[];
    setLikedPlaces: (places: PlaceFullSchema[]) => void;
    removeLikedPlace: (id: string) => void;
    addLikedPlace: (place: PlaceFullSchema) => void;


}

export const useStore = create<StoreState>((set, get) => ({
    activePlaceData: null,
    setActivePlaceData: (place: PlaceFullSchema) => set({ activePlaceData: place }),
    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    searchResultsData: [],
    setSearchResultsData: (data: PlaceFullSchema[]) => set({ searchResultsData: data }),
    likedPlaces: [],
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
}));

export default useStore;

// Mock data 