import { PlaceFullSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useStore } from "@/store/model";
import { SearchModel } from "@/Model/searchModel";
import { router } from "expo-router";

export default function SearchPresenter() {
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const likedPlaces = useStore((state) => state.likedPlaces);
  const addLikedPlace = useStore((state) => state.addLikedPlace);
  const removeLikedPlace = useStore((state) => state.removeLikedPlace);
  const isLikedPlace = useStore((state) => state.isLikedPlace);
  const { searchQuery, setSearchQuery } = useStore();
  const { searchResultsData, setSearchResultsData } = useStore();
  const idToItem = useStore((state) => state.idToItem);
  const handleToggleLike = useStore((state) => state.handleToggleLike)

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
