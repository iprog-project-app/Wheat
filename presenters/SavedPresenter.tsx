import { PlacePreviewSchema } from "@/constants/types";
import SavedView from "../views/SavedView";
import { useState } from "react";
import { placesData } from "../store/model";

export default function SavedPresenter() {
  // TODO: Fetch search results from API instead of placesData

  // TODO: Fetch liked data from user
  const likedData = placesData.filter((item) => item.isLiked);

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
  const searchResults = likedData.filter((item) =>
    item.title.toLowerCase().startsWith(search.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  return (
    <SavedView
      searchQuery={search}
      searchResults={search ? sortedResults : likedData}
      onChangeText={updateSearch}
      toggleLike={(id) => () => console.log("Toggle like: ", id)} // TODO: Toggle like for item
      onPressItem={(id) => () => console.log("Press item: ", id)} // TODO: Open modal with details
    />
  );
}
