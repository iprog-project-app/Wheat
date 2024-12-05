import { PlaceFullSchema, PlacePreviewSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useState } from "react";
import { useStore, placesData } from "@/store/model";
import { SearchModel } from "@/Model/searchModel";

export default function SearchPresenter() {
  const { activePlaceData, setActivePlaceData } = useStore();
  const [query, setQuery] = useState("");
  const [searchResultsData, setSearchResultsData] = useState(
    [] as PlaceFullSchema[]
  );

  // TODO: Fetch search results
  // Imported placesData is mock data (this would represent all places in the database) but we would fetch based on a query (I guess)

  // TODO: Fetch recent searches from model (not needed though, it works without)
  // Mock recent searches (should probably be the full objects)
  const recentSearches = [
    "omnipollos",
    "fotografiska",
    "lilla-ego",
    "meatballs",
  ];

  // Probably not needed, as it's better to store the full data
  // Or maybe useful if we only want to return the ID from the view
  function idToItem(id: string) {
    return searchResultsData.find((item) => item.id === id);
  }

  const sortResults = (results: PlaceFullSchema[]) => {
    return results.sort((a, b) => a.title.localeCompare(b.title));
  };

  const recentSearchesData = recentSearches
    .map((id) => idToItem(id))
    .filter((place): place is PlaceFullSchema => place !== undefined);

  const updateSearch = (search: string) => {
    setQuery(search);
  };

  // TODO: Implement search, but through the API
  // Mock search
  const searchResults = placesData.filter((item) =>
    item.title.toLowerCase().startsWith(query.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  // Convert to PlacePreviewSchema before passing to view
  const resultsToDisplay: PlacePreviewSchema[] = (
    query ? sortedResults : recentSearchesData
  ).map((place) => ({
    id: place.id,
    title: place.title,
    location: place.location,
    imageUri: place.imageUri,
    rating: place.rating,
    isLiked: place.isLiked,
    note: place.note,
  }));

  const toggleActiveData = (id: string) => () => {
    const data = idToItem(id);
    if (data) {
      setActivePlaceData(data as PlaceFullSchema);
      console.log("Set Active data: ", activePlaceData);
    }
  };

  const toggleLike = (id: string) => () => {
    console.log("Toggle like: ", id);
  };

  const handleSearch = async () => {
    try {
      // Call the fetchPlacesByTextSearch function and await the result
      const places = await SearchModel.fetchPlacesByTextSearch(query);

      setSearchResultsData(places);

      // Log the result to check if an array of objects is returned
      console.log("Search Results:", places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <SearchView
      searchQuery={query}
      searchResults={searchResultsData}
      onChangeText={updateSearch}
      toggleLike={toggleLike} // TODO: Toggle like for item
      onPressItem={toggleActiveData} // TODO: Open modal with details
      onSearch={handleSearch}
    />
  );
}
