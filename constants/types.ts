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
  price: '$' | '$$' | '$$$' | '$$$$';
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