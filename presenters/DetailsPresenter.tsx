import DetailsView from "../views/DetailsView";
import useStore from "@/store/model";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function DetailsPresenter() {
  const { source } = useLocalSearchParams(); // Hämta 'source'

  const activePlaceData = useStore((state) => state.activePlaceData);
  const likedPlaces = useStore((state) => state.likedPlaces);
  const removeLikedPlace = useStore((state) => state.removeLikedPlace);
  const addLikedPlace = useStore((state) => state.addLikedPlace);
  const isLikedPlace = useStore((state) => state.isLikedPlace);
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const allLikedPlaces = useStore((state) => state.allLikedPlaces);
  const getNoteFromId = useStore((state) => state.getNoteFromId);
  const setNote = useStore((state) => state.setNote);

  // Event handlers
  // TODO: Move to store/model.ts as its used multiple times
  const handleLikeToggle = (id: string) => {
    // TODO: Toggle like for item (same as in SearchPresenter adn SavedPresenter). Add an alert if its a dislike to make sure the user wants to remove it
    const place = activePlaceData;
    if (activePlaceData?.id && isLikedPlace(activePlaceData.id)) {
      removeLikedPlace(activePlaceData.id);
      console.log("Removed from liked places: ", activePlaceData.id);
    } else {
      if (place) {
        addLikedPlace(place);
        console.log("Added to liked places: ", activePlaceData.id), likedPlaces;
      } else {
        console.error("Could not find item with id: ");
      }
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleNoteChange = (note: string) => {
    console.log("Modal closed with note:", note);
    setNote(note); // Save note to store
  };

  const handleLinkPress = () => {
    console.log("Weblink pressed");
    // TODO
  };

  const checkButtonState = activePlaceData
    ? source === "randomize" || source === "friends"
      ? "randomize"
      : isLikedPlace(activePlaceData.id)
      ? "liked"
      : "notLiked"
    : "notLiked";

  const handleRandomize = () => {
    let randomPlace;
    if (source === "friends") {
      do {
        randomPlace =
          allLikedPlaces[Math.floor(Math.random() * allLikedPlaces.length)];
      } while (randomPlace?.id === activePlaceData?.id);
      setActivePlaceData(randomPlace);
    } else {
      do {
        randomPlace =
          likedPlaces[Math.floor(Math.random() * likedPlaces.length)];
      } while (randomPlace?.id === activePlaceData?.id);
      setActivePlaceData(randomPlace);
    }
  };

  return (
    <DetailsView
      placeData={activePlaceData}
      onLikeToggle={handleLikeToggle}
      onBackPress={handleBackPress}
      onNoteChange={handleNoteChange}
      onLinkPress={handleLinkPress}
      rightButtonState={checkButtonState}
      onRandomize={handleRandomize}
      note={
        activePlaceData
          ? getNoteFromId(activePlaceData.id) || undefined
          : undefined
      }
    />
  );
}
