import { PlaceFullSchema, PlacePreviewSchema } from "@/constants/types";
import SavedView from "../views/SavedView";
import { useState } from "react";
import useStore from "../store/model";
import { router } from "expo-router";

export default function SavedPresenter() {
  const { setActivePlaceData, likedPlaces } = useStore();

  const sortResults = (
    results: Array<PlacePreviewSchema>
  ): Array<PlacePreviewSchema> => {
    return results.sort((a, b) => a.title.localeCompare(b.title));
  };

  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  // Keep this, this search is just a filter of the likedData
  const searchResults = likedPlaces.filter((item) =>
    item.title.toLowerCase().startsWith(search.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  function idToItem(id: string) {
    return likedPlaces.find((item) => item.id === id);
  }

  const toggleActiveData = (id: string) => () => {
    const data = idToItem(id);
    if (data) {
      setActivePlaceData(data as PlaceFullSchema);
      router.push("/details");
    }
  };

  const handleLikeToggle = (id: string) => () => {
    // TODO: Toggle like for item (same as in DetailsPresenter and SearchPresenter).  Add an alert if its a dislike to make sure the user wants to remove it
    console.log("Toggle like: ", id);
  };

  return (
    <SavedView
      searchQuery={search}
      searchResults={search ? sortedResults : likedPlaces}
      onChangeText={updateSearch}
      toggleLike={handleLikeToggle}
      onPressItem={toggleActiveData}
    />
  );
}
