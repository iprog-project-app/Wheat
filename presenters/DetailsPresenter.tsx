import React, { useState } from "react";
import DetailsView from "../views/DetailsView";
import { PlaceFullSchema } from "@/constants/types";

export default function DetailsPresenter() {
  // Mock data
  const mockData: PlaceFullSchema = {
    id: "1",
    title: "Waipo Mood",
    description:
      "Waipo means Grandma in Chinese & is an appropriate name for this homey & welcoming restaurant.",
    location: "Jakobsbergsgatan 15",
    rating: 4.2,
    price: "$$",
    imageUri:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/6e/ce/8f/picture-from-waipo-stockholm.jpg",
    website: "https://waipo.se",
    isLiked: true,
    note: "",
  };

  // State for dynamic behavior
  const [placeData, setPlaceData] = useState(mockData);

  // Event handlers
  const onLikeToggle = () => {
    console.log("Liked");
  };

  const onNoteChange = () => {
    console.log("Note changed");
  };

  const onBackPress = () => {
    console.log("Back button pressed");
  };

  const onModalClose = () => {
    console.log("Modal closed");
  };

  const onLinkPress = () => {
    console.log("Weblink pressed");
  };

  return (
    <DetailsView
      placeData={placeData}
      onLikeToggle={onLikeToggle}
      onNoteChange={onNoteChange}
      onBackPress={onBackPress}
      onModalClose={onModalClose}
      onLinkPress={onLinkPress}
    />
  );
}
