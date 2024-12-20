import { PlaceFullSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useStore } from "@/model/model";
import { SearchModel } from "@/model/searchModel";
import { router } from "expo-router";

export default function SearchPresenter() {
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const addLikedPlace = useStore((state) => state.addLikedPlace);
  const removeLikedPlace = useStore((state) => state.removeLikedPlace);
  const isLikedPlace = useStore((state) => state.isLikedPlace);
  const { searchQuery, setSearchQuery } = useStore();
  const { searchResultsData, setSearchResultsData } = useStore();

  // TODO: Move to store/model.ts as its used multiple times
  function idToItem(id: string) {
    return searchResultsData.find((item) => item.id === id);
  }

  const sortResults = (results: PlaceFullSchema[]) => {
    return results.sort((a, b) => a.title.localeCompare(b.title));
  };

  const updateSearch = (search: string) => {
    setSearchQuery(search);
  };

  const toggleActiveData = (id: string) => () => {
    const data = idToItem(id);
    if (data) {
      console.log("Active data: ", data.id);
      setActivePlaceData(data as PlaceFullSchema);
      router.push("/details");
    }
  };

  // TODO: Move to store/model.ts as its used multiple times
  const handleToggleLike = (id: string) => () => {
    const place = idToItem(id);
    if (isLikedPlace(id)) {
      removeLikedPlace(id);
      console.log("Removed from liked places: ", id);
    } else {
      if (place) {
        addLikedPlace(place);
        console.log("Added to liked places: ", id);
      } else {
        console.error("Could not find item with id: ", id);
      }
    }
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
      searchResults={sortResults(searchResultsData)}
      onChangeText={updateSearch}
      toggleLike={handleToggleLike}
      onPressItem={toggleActiveData}
      onSearch={handleSearch}
    />
  );
}
