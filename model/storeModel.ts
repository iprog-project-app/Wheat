import { PlaceFullSchema, UserSchema, FriendSchema } from "@/constants/types";
import { create } from "zustand";

export interface StoreSchema extends UserSchema {
  // User
  loggedInUserId: string | null;
  setLoggedInUserId: (uid: string) => void;
  setUser: (user: UserSchema | undefined) => void;

  // Friends
  friends: FriendSchema[];
  setFriends: (friends: FriendSchema[]) => void;
  addFriend: (friend: FriendSchema) => void;
  removeFriend: (id: string) => void;
  isFriend: (id: string) => boolean;
  selectedFriends: FriendSchema[] | undefined;
  setSelectedFriends: (friends: FriendSchema[] | undefined) => void;
  addSelectedFriend: (friend: FriendSchema) => void;
  removeSelectedFriend: (id: string) => void;
  allLikedPlaces: PlaceFullSchema[];
  setAllLikedPlaces: (places: PlaceFullSchema[]) => void;

  // Friend Search
  friendSearchQuery: string;
  setFriendSearchQuery: (query: string) => void;
  friendSearchResultsData: FriendSchema[];
  setFriendSearchResultsData: (data: FriendSchema[]) => void;
  activeFriendData: FriendSchema | null;
  setActiveFriendData: (friend: FriendSchema) => void;

  // Places Search
  activePlaceData: PlaceFullSchema | null;
  setActivePlaceData: (place: PlaceFullSchema) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResultsData: PlaceFullSchema[];
  setSearchResultsData: (data: PlaceFullSchema[]) => void;
  setRecentSearches: (places: PlaceFullSchema[]) => void;

  // Liked Places
  likedPlaces: PlaceFullSchema[];
  setLikedPlaces: (places: PlaceFullSchema[]) => void;
  removeLikedPlace: (id: string) => void;
  addLikedPlace: (place: PlaceFullSchema) => void;
  isLikedPlace: (id: string) => boolean;
}

export const useStore = create<StoreSchema>((set, get) => ({
  // User
  loggedInUserId: null,
  name: "",
  setName: (name: string) => set({ name }),
  email: "",
  setEmail: (email: string) => set({ email }),
  imgUrl: "",
  setImgUrl: (imgUrl: string) => set({ imgUrl }),
  setLoggedInUserId: (uid: string) => {
    set({ loggedInUserId: uid });
  },
  setUser: (user: UserSchema | undefined) => {
    set((state) => ({
      ...state,
      ...user,
    }));
  },

  // Friends
  friends: [],
  setFriends: (friends: FriendSchema[]) => set({ friends }),
  addFriend: (friend: FriendSchema) => {
    const currentFriends = get().friends;
    const exists = currentFriends.some((f) => f.userId === friend.userId);
    if (exists) {
      console.warn(`Friend with id ${friend.userId} already exists.`);
      return;
    }
    const updatedFriends = [...currentFriends, friend];
    set({ friends: updatedFriends });
  },
  removeFriend: (id: string) => {
    const currentFriends = get().friends;
    const updatedFriends = currentFriends.filter(
      (friend) => friend.userId !== id
    );
    if (updatedFriends.length === currentFriends.length) {
      console.warn(
        `Tried to remove friend that was not in friends, with id: ${id}`
      );
    }
    set({ friends: updatedFriends });
  },
  isFriend: (id: string) => {
    const friendIds = get().friends.map((friend) => friend.userId);
    return friendIds.includes(id);
  },
  selectedFriends: undefined,
  setSelectedFriends: (friends: FriendSchema[] | undefined) =>
    set({ selectedFriends: friends }),
  addSelectedFriend: (friend: FriendSchema) => {
    const currentSelectedFriends = get().selectedFriends;
    const exists = currentSelectedFriends?.some(
      (f) => f.userId === friend.userId
    );
    if (exists) {
      console.warn(`Friend with id ${friend.userId} already exists.`);
      return;
    }
    const updatedSelectedFriends = [
      ...(currentSelectedFriends ?? []),
      friend,
    ];
    set({ selectedFriends: updatedSelectedFriends });
  }
  ,
  removeSelectedFriend: (id: string) => {
    const currentSelectedFriends = get().selectedFriends;
    if (!currentSelectedFriends) {
      console.warn(
        `Tried to remove friend from selectedFriends, but selectedFriends was undefined.`
      );
      return;
    }
    const updatedSelectedFriends = currentSelectedFriends.filter(
      (friend) => friend.userId !== id
    );
    if (updatedSelectedFriends.length === currentSelectedFriends.length) {
      console.warn(
        `Tried to remove friend that was not in selectedFriends, with id: ${id}`
      );
    }
    set({ selectedFriends: updatedSelectedFriends
    });
  }
  ,
  allLikedPlaces: [],
  setAllLikedPlaces: (places: PlaceFullSchema[]) =>
    set({ allLikedPlaces: places }),

  // Friend Search
  friendSearchQuery: "",
  setFriendSearchQuery: (query: string) => set({ friendSearchQuery: query }),
  friendSearchResultsData: [],
  setFriendSearchResultsData: (data: FriendSchema[]) =>
    set({ friendSearchResultsData: data }),
  activeFriendData: null,
  setActiveFriendData: (friend: FriendSchema) =>
    set({ activeFriendData: friend }),

  // Places Search
  activePlaceData: null,
  setActivePlaceData: (place: PlaceFullSchema) =>
    set({ activePlaceData: place }),
  searchQuery: "",
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  searchResultsData: [],
  setSearchResultsData: (data: PlaceFullSchema[]) =>
    set({ searchResultsData: data }),
  recentSearches: [],
  setRecentSearches: (places: PlaceFullSchema[]) =>
    set({ recentSearches: places }),

  // Liked Places
  likedPlaces: [],
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
    const exists = currentLikedPlaces.some(
      (existingPlace) => existingPlace.id === place.id
    );
    if (exists) {
      console.warn(`Place with id ${place.id} already exists in likedPlaces.`);
      return;
    }
    const updatedLikedPlaces = [...currentLikedPlaces, place];
    set({ likedPlaces: updatedLikedPlaces });
  },
  isLikedPlace: (id: string) => {
    const likedIds = get().likedPlaces.map((place) => place.id);
    return likedIds.includes(id);
  },
}));

export default useStore;
