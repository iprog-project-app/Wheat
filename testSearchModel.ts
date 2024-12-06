import { SearchModel } from "./Model/searchModel"; // Import the SearchModel

const testSearch = async (query: string) => {
  try {
    // Call the fetchPlacesByTextSearch function and await the result
    const places = await SearchModel.fetchPlacesByTextSearch(query);

    // Log the result to check if an array of objects is returned
    console.log("Search Results:", places);
  } catch (error) {
    console.error("Error fetching places:", error);
  }
};

// Example test input
testSearch("sushi"); // You can replace this with any other query
