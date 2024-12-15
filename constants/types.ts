import { Ionicons } from "@expo/vector-icons";

export type PlacePreviewSchema = {
  id: string; // place_id
  title: string;
  imageUri: string;
  rating: number;
  location: string;
  note?: string;
};

export type PlaceFullSchema = PlacePreviewSchema & {
  description: string;
  price: "$" | "$$" | "$$$" | "$$$$";
  website: string;
};

export type SettingsOption = {
  title: string;
  description: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string | undefined;
  onPress?: () => void;
};

export type FriendSchema = {
  name: string;
  email: string;
  userId: string;
};

export type UserSchema = {
  name: string;
  email: string;
  imgUrl: string;
  friends: FriendSchema[];
  likedPlaces: PlaceFullSchema[];
  recentSearches: PlaceFullSchema[];
};

export type StoreSchema = UserSchema & {
  loggedInUserId: string | null;
  setLoggedInUserId: (uid: string) => void;
  setUser: (user: UserSchema | undefined) => void;
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
};
