import { PlaceFullSchema, PlacePreviewSchema } from "@/constants/types";
import SavedView from "../views/SavedView";
import { useState } from "react";
import useStore from "../model/model";
import { router } from "expo-router";

export default function SavedPresenter() {
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const likedPlaces = useStore((state) => state.likedPlaces);
  const removeLikedPlace = useStore((state) => state.removeLikedPlace);
  const addLikedPlace = useStore((state) => state.addLikedPlace);
  const isLikedPlace = useStore((state) => state.isLikedPlace);

  const [likeFilter, setLikeFilter] = useState("");

  const sortResults = (
    results: Array<PlacePreviewSchema>
  ): Array<PlacePreviewSchema> => {
    return results.sort((a, b) => a.title.localeCompare(b.title));
  };

  const updateSearch = (search: string) => {
    setLikeFilter(search);
  };

  // Filter the likedData
  const searchResults = likedPlaces.filter((item) =>
    item.title.toLowerCase().startsWith(likeFilter.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  // TODO: Move to store/model.ts as its used multiple times
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

  // TODO: Move to store/model.ts as its used multiple times
  const handleLikeToggle = (id: string) => () => {
    // TODO: Toggle like for item (same as in DetailsPresenter and SearchPresenter). Add an alert if its a dislike to make sure the user wants to remove it
    const place = idToItem(id);
    if (isLikedPlace(id)) {
      removeLikedPlace(id);
    } else {
      if (place) {
        addLikedPlace(place);
      } else {
        console.error(
          `Could not find place from id: ${id} when adding to saved places.`
        );
      }
    }
  };

  return (
    <>
      <SavedView
        searchQuery={likeFilter}
        searchResults={sortedResults}
        onChangeText={updateSearch}
        toggleLike={handleLikeToggle}
        onPressItem={toggleActiveData}
      />
    </>
  );
}
