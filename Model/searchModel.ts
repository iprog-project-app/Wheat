import { GOOGLE_API_KEY } from "../Config/googleAPIConfig";
import { PlaceFullSchema } from "../constants/types";


/**
 * Fetches places from the Google Places API using Text Search
 * @param query - The search query string
 * @returns An array of PlaceFullSchema objects
 */
export const fetchPlacesByTextSearch = async (query: string): Promise<PlaceFullSchema[]> => {
  const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

  const response = await fetch(
    `${endpoint}?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
  );
  const data = await response.json();
  if (data.status !== "OK") {
    throw new Error(data.error_message || "Failed to fetch places.");
  }

  // Map API results to the PlaceFullSchema
  return data.results.map((place: any) => ({
    id: place.place_id,
    title: place.name,
    imageUri: place.photos
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
      : "",
    rating: place.rating || 0,
    location: place.formatted_address || "",
    isLiked: false, // Default value
    description: place.types ? place.types?.join(", ") : "",
    price: place.price_level
      ? "$".repeat(place.price_level) as PlaceFullSchema["price"]
      : "$",
    website: "", // Needs another API call to fetch this detail
  }));
};
export const SearchModel = { fetchPlacesByTextSearch, };
