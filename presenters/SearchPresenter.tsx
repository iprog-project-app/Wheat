import { PlaceFullSchema, PlacePreviewSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useStore, likedPlacesData } from "@/store/model";
import { SearchModel } from "@/Model/searchModel";
import { router } from "expo-router";
import { isPlaceLiked } from "@/utilities/likedPlaces";

export default function SearchPresenter() {
  const { setActivePlaceData } = useStore();
  const { searchQuery, setSearchQuery } = useStore();
  const { searchResultsData, setSearchResultsData } = useStore();

  // TODO: Fetch search results
  // Imported placesData is mock data (this would represent all places in the database) but we would fetch based on a searchQuery (I guess)

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
    setSearchQuery(search);
  };

  // TODO: Implement search, but through the API
  // Mock search
  const searchResults = likedPlacesData.filter((item) =>
    item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  // Convert to PlacePreviewSchema before passing to view
  const resultsToDisplay: PlacePreviewSchema[] = (
    searchResultsData
  ).map((place) => ({
    id: place.id,
    title: place.title,
    location: place.location,
    imageUri: place.imageUri,
    rating: place.rating,
    isLiked: isPlaceLiked(place.id, likedPlacesData), 
    note: place.note,
  }));

  const toggleActiveData = (id: string) => () => {
    const data = idToItem(id);
    if (data) {
      console.log("Active data: ", data.id);
      setActivePlaceData(data as PlaceFullSchema);
      router.push("/details");
    }
  };

  const handleToggleLike = (id: string) => () => {
    // TODO: Toggle like for item (same as in DetailsPresenter and SavedPresenter). Add an alert if its a dislike to make sure the user wants to remove it
    console.log("Toggle like: ", id);
  };

  const handleSearch = async () => {
    try {
      // Call the fetchPlacesByTextSearch function and await the result
      const places = await SearchModel.fetchPlacesByTextSearch(searchQuery);

      setSearchResultsData(places);

      // Log the result to check if an array of objects is returned
      console.log("Search Results:", places);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return (
    <SearchView
      searchQuery={searchQuery}
      searchResults={resultsToDisplay}
      onChangeText={updateSearch}
      toggleLike={handleToggleLike} // TODO: Toggle like for item
      onPressItem={toggleActiveData}
      onSearch={handleSearch}
    />
  );
}
