import React from "react";
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

  // TODO: Remove onNoteChange
  const handleNoteChange = () => {
    console.log("Note changed");
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleModalClose = () => {
    // Ha kvar TODO:n nedan, men tills vidare kan passa *note* in i denna funktion och console.logga
    console.log("Modal closed, save note");
    // TODO
  };

  const handleLinkPress = () => {
    console.log("Weblink pressed");
    // TODO
  };

  const checkButtonState = activePlaceData
    ? source === "randomize"
      ? "randomize"
      : isLikedPlace(activePlaceData.id)
      ? "liked"
      : "notLiked"
    : "notLiked";

    const handleRandomize = () => {
        const randomPlace =
          likedPlaces[Math.floor(Math.random() * likedPlaces.length)];
        setActivePlaceData(randomPlace); 
        //TODO add a check if the random place is the same as the current active place
    };
  
  return (
    <DetailsView
      placeData={activePlaceData}
      onLikeToggle={handleLikeToggle}
      // TODO: Remove onNoteChange
      onNoteChange={handleNoteChange}
      onBackPress={handleBackPress}
      // TODO: Add note parameter to onModalClose
      onModalClose={handleModalClose}
      onLinkPress={handleLinkPress}
      rightButtonState={checkButtonState}
      onRandomize={handleRandomize}
    />
  );
}
