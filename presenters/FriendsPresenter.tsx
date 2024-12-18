import FriendsView from "@/views/FriendsView";
import { Alert } from "react-native";
import useStore from "@/store/model";
import { router } from "expo-router";
import { FriendSchema } from "@/constants/types";

export default function FriendsPresenter() {
  const { friends, addFriend, removeFriend } = useStore();

  const handleToggleFollow = (user: FriendSchema) => {
    if (friends.find((friend) => friend.userId === user.userId)) {
      handleRemoveFriend(user);
    }
    addFriend({ ...user });
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

  const handleAddFriends = () => {
    router.push("/friendSearch");
  };

  const handlePressItem = (user: FriendSchema) => {
    console.log("Sett profile modal visible. ID: ", user.userId);
  };

  return (
    <FriendsView
      friendsList={friends}
      onPressItem={handlePressItem}
      onToggleFollow={handleToggleFollow}
      onPressSearchFriends={handleAddFriends}
    />
  );
}
