import { FriendSchema, PlaceFullSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useStore } from "@/model/storeModel";
import { router } from "expo-router";
import { friendsSearch } from "@/model/firebaseModel";
import { useState } from "react";
import FriendSearchView from "@/views/FriendSearchView";
import { Alert, Platform } from "react-native";

export default function FriendSearchPresenter() {
  // const setActiveUserData = useStore((state) => state.setActiveUserData); // TODO
  const addFriend = useStore((state) => state.addFriend);
  const removeFriend = useStore((state) => state.removeFriend);
  const { setActiveFriendData } = useStore();
  const { friendSearchQuery, setFriendSearchQuery } = useStore();
  const { friendSearchResultsData, setFriendSearchResultsData } = useStore();
  const { friends } = useStore();
  const { isFriend } = useStore();

  // TODO: Move to store/model.ts as its used multiple times
  const sortResults = (results: FriendSchema[]) => {
    return results.sort((a, b) => a.name.localeCompare(b.name));
  };

  const updateSearch = (search: string) => {
    setFriendSearchQuery(search);
  };

  const toggleActiveData = (data: FriendSchema) => {
    setActiveFriendData(data);
    router.push("/friendProfile");
  };

  // TODO:handle toggle follow

  const handleSearch = async () => {
    try {
      // Call the fetchPlacesByTextSearch function and await the result
      const friendsResults = await friendsSearch(friendSearchQuery);
      console.log("Friends results: ", friendsResults);
      if (friendsResults) {
        setFriendSearchResultsData(friendsResults);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleToggleFollow = (user: FriendSchema) => {
    console.log("Toggling follow for user: ", user);
    if (isFriend(user.userId)) {
      handleRemoveFriend(user);
    } else {
      console.log("Adding friend: ", user);
      addFriend({ ...user });
    }
  };

  const handleRemoveFriend = (user: FriendSchema) => {
    if (Platform.OS === "web") {
      if (
        window.confirm(`Are you sure you want to stop following ${user.name}?`)
      ) {
        removeFriend(user.userId);
      }
    } else {
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
    }
  };

  return (
    <FriendSearchView
      searchQuery={friendSearchQuery}
      searchResults={sortResults(friendSearchResultsData)}
      onChangeText={updateSearch}
      onToggleFollow={handleToggleFollow}
      onPressItem={toggleActiveData}
      onSearch={handleSearch}
    />
  );
}
