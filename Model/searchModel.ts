import store from "@/store/model";
import { GOOGLE_API_KEY } from "../Config/googleAPIConfig";
import { PlaceFullSchema } from "../constants/types";

const DEFAULT_LOCATION = "59.3293,18.0686"; // Stockholm as fallback (needed now that we use a proxy)

const getCurrentLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = `${position.coords.latitude},${position.coords.longitude}`;
        resolve(location);
      },
      () => resolve(DEFAULT_LOCATION), // On error, use Stockholm
      { timeout: 5000 }
    );
  });
};

/**
 * Fetches places from the Google Places API using Text Search
 * @param query - The search query string
 * @returns An array of PlaceFullSchema objects
 */
export const fetchPlacesByTextSearch = async (
  query: string
): Promise<PlaceFullSchema[]> => {
  if (!query?.trim()) {
    throw new Error("Search query is empty.");
  }
  const proxyUrl = "https://brfenergi.se/iprog/group/46";
  const targetUrl =
    "https://maps.googleapis.com/maps/api/place/textsearch/json";
  const location = await getCurrentLocation();
  const placesEndpoint = `${proxyUrl}/${targetUrl}`;

  try {
    const response = await fetch(
      `${placesEndpoint}?query=${encodeURIComponent(
        query
      )}&type=restaurant&key=${GOOGLE_API_KEY}&location=${location}&radius=50000`,
      {
        method: "GET",
        headers: {
          "X-DH2642-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767",
          "X-DH2642-Group": "46",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // For debugging

    // Only throw error if status is not OK or ZERO_RESULTS
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      throw new Error(data.error_message || "Failed to fetch places.");
    }

    // Return empty array if no results
    if (data.status === "ZERO_RESULTS") {
      return [];
    }

    // Map API results to the PlaceFullSchema
    return data.results.map((place: any) => ({
      id: place.place_id,
      title: place.name,
      imageUri: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
      rating: place.rating || 0,
      location: place.formatted_address || "",
      isLiked: false, // Default value
      description: place.types ? place.types?.join(", ") : "",
      price: place.price_level
        ? ("$".repeat(place.price_level) as PlaceFullSchema["price"])
        : "$",
      website: "", // Needs another API call to fetch this detail
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export const SearchModel = { fetchPlacesByTextSearch };
