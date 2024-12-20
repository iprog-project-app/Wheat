import { Alert } from "react-native";
import useStore from "@/model/storeModel";
import { router } from "expo-router";
import { FriendSchema } from "@/constants/types";
import SelectFriendsView from "@/views/SelectFriendsView";
import { idToLikedPlaces } from "@/model/firebaseModel";
import { PlaceFullSchema } from "@/constants/types";

export default function SelectFriendsPresenter() {
  const friends = useStore((state) => state.friends);
  const selectedFriends = useStore((state) => state.selectedFriends);
  const setSelectedFriends = useStore((state) => state.setSelectedFriends);
  const setActiveFriendData = useStore((state) => state.setActiveFriendData);
  const setActivePlaceData = useStore((state) => state.setActivePlaceData);
  const likedPlaces = useStore((state) => state.likedPlaces);
  const setAllLikedPlaces = useStore((state) => state.setAllLikedPlaces);

  const handleToggleSelected = (user: FriendSchema) => {
    console.log("Toggling selected friend: ", user);
    if (selectedFriends?.includes(user)) {
      setSelectedFriends(
        selectedFriends.filter((f) => f.userId !== user.userId)
      );
    } else {
      setSelectedFriends([...(selectedFriends ?? []), user]);
    }
    console.log("Selected friends: ", selectedFriends);
  };

  const handlePressItem = (data: FriendSchema) => {
    setActiveFriendData(data);
    router.push("/friendProfile");
  };

  const handlePressRandomize = async () => {
    if (!selectedFriends || selectedFriends.length === 0) {
      Alert.alert(
        "No friends with liked places",
        "Please select some friends first and make sure they have saved spots."
      );
      return;
    }
    const friendsLikedPlaces: PlaceFullSchema[] = (
      await Promise.all(
        selectedFriends.map((friend) => idToLikedPlaces(friend.userId))
      )
    ).flat();

    const updatedLikedPlaces = [...friendsLikedPlaces, ...likedPlaces];
    setAllLikedPlaces(updatedLikedPlaces);

    console.log("All liked places: ", updatedLikedPlaces);
    if (updatedLikedPlaces.length === 0) {
      Alert.alert(
        "No liked places",
        "None of the selected friends have any liked places."
      );
      return;
    }
    const randomPlace =
      updatedLikedPlaces[Math.floor(Math.random() * updatedLikedPlaces.length)];

    console.log("Random place: ", randomPlace);
    setActivePlaceData(randomPlace);
    router.push({
      pathname: "/details",
      params: { source: "friends" },
    });
  };

  const friendsAndSelected = [
    ...new Set([...friends, ...(selectedFriends ? selectedFriends : [])]),
  ];

  return (
    <SelectFriendsView
      friendsList={friendsAndSelected}
      selectedFriends={selectedFriends}
      onPressItem={handlePressItem}
      onToggleSelected={handleToggleSelected}
      onPressRandomize={handlePressRandomize}
    />
  );
}
