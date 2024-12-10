import React from "react";
import DetailsView from "../views/DetailsView";
import useStore from "@/store/model";
import { router } from "expo-router";

export default function DetailsPresenter() {
  const { activePlaceData, setActivePlaceData } = useStore();

  // Event handlers
  const handleLikeToggle = () => {
    // TODO: Toggle like for item (same as in SearchPresenter adn SavedPresenter). Add an alert if its a dislike to make sure the user wants to remove it
    console.log("Liked");
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
      rightButtonState="liked"
    />
  );
}
