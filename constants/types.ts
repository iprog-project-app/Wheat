export type PlacePreviewSchema = {
  id: string; // place_id
  title: string;
  imageUri: string;
  rating: number;
  location: string;
  isLiked: boolean;
  note?: string;
};

export type PlaceFullSchema = PlacePreviewSchema & {
  description: string;
  price: '$' | '$$' | '$$$' | '$$$$';
  website: string;
  note: string;
};