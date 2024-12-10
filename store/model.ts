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
    isLikedPlace: (id: string) => boolean;

}

export const useStore = create<StoreState>((set, get) => ({
    activePlaceData: null,
    setActivePlaceData: (place: PlaceFullSchema) => set({ activePlaceData: place }),
    searchQuery: "",
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    searchResultsData: [],
    setSearchResultsData: (data: PlaceFullSchema[]) => set({ searchResultsData: data }),
    likedPlaces: [{
      id: "ChIJowodOvt3X0YRjYM1JobP3Gg",
      title: "Omnipollos hatt",
      location: "Hökens gata 1A",
      imageUri:
        "https://thumbor.junction.travel/zOTYvRLxJ3fkKYbywkrX7EtjNHY=/1092x0/smart/https%3A%2F%2Fcontent.res.se%2Fsites%2Fdefault%2Ffiles%2Fgoogle-places%2FChIJowodOvt3X0YRjYM1JobP3Gg.jpg",
      rating: 4.5,
      note: "Marcus favoritställe! Bästa ölen och bästa pizzan! (Prova “slush-ölen”!!)",
      description:
        "Omnipollos hatt är en pizzeria och bryggeri som ligger på Folkungagatan på Södermalm i Stockholm. Pizzerian är känd för sina udda pizzakreationer och bryggeriet för sina öl. Pizzerian har funnits sedan 2014 och bryggeriet sedan 2011.",
      price: "$$",
      website: "https://omnipolloshatt.se/",
    }],
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

// Mock data 