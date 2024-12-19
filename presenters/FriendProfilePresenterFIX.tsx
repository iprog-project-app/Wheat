import {
  FriendSchema,
  PlaceFullSchema,
  PlacePreviewSchema,
} from "@/constants/types";
import { useEffect, useState } from "react";
import useStore from "../store/model";
import { router } from "expo-router";
import FriendProfileView from "@/views/FriendProfileView";
import { idToLikedPlaces } from "@/utilities/firebaseModel";
import { Alert } from "react-native";

export default function FriendProfilePresenter() {
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const likedPlaces = useStore((state) => state.likedPlaces);
  const removeLikedPlace = useStore((state) => state.removeLikedPlace);
  const addLikedPlace = useStore((state) => state.addLikedPlace);
  const isLikedPlace = useStore((state) => state.isLikedPlace);
  const activeFriendData = useStore((state) => state.activeFriendData);
  const addFriend = useStore((state) => state.addFriend);
  const removeFriend = useStore((state) => state.removeFriend);
  const { isFriend } = useStore();

  const [friendsPlaces, setFriendsPlaces] = useState<
    PlacePreviewSchema[] | undefined
  >(undefined);

  function idToItem(id: string): PlaceFullSchema | undefined {
    return friendsPlaces?.find((item) => item.id === id) as
      | PlaceFullSchema
      | undefined;
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

  useEffect(() => {
    if (activeFriendData) {
      idToLikedPlaces(activeFriendData.userId).then(setFriendsPlaces);
    }
  }, [activeFriendData]);

  const handleToggleFollow = () => {
    if (!activeFriendData) {
      console.error("No active friend data");
      return;
    }
    console.log("Toggling follow for user: ", activeFriendData);
    if (isFriend(activeFriendData.userId)) {
      handleRemoveFriend(activeFriendData);
    } else {
      console.log("Adding friend: ", activeFriendData);
      addFriend({ ...activeFriendData });
    }
  };

  const handleRemoveFriend = (user: FriendSchema) => {
    Alert.alert(
      "Remove Friend",
      `Are you sure you want to stop following ${user.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            removeFriend(user.userId);
          },
        },
      ]
    );
  };

  return (
    <>
      {!activeFriendData ? (
        console.error("No active friend data")
      ) : (
        <FriendProfileView
          name={activeFriendData.name}
          places={friendsPlaces}
          isFollowing={isFriend(activeFriendData.userId)}
          onToggleFollow={handleToggleFollow}
          toggleLike={handleLikeToggle}
          onPressItem={toggleActiveData}
        />
      )}
    </>
  );
}
