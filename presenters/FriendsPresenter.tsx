import FriendsView from "@/views/FriendsView";
import { Alert, Platform } from "react-native";
import useStore from "@/model/model";
import { router } from "expo-router";
import { FriendSchema } from "@/constants/types";

export default function FriendsPresenter() {
  const { friends, addFriend, removeFriend } = useStore();
  const setActiveFriendData = useStore((state) => state.setActiveFriendData);

  const handleToggleFollow = (user: FriendSchema) => {
    if (friends.find((friend) => friend.userId === user.userId)) {
      handleRemoveFriend(user);
    }
    addFriend({ ...user });
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

  const handleAddFriends = () => {
    router.push("/friendSearch");
  };

  const handlePressItem = (data: FriendSchema) => {
    setActiveFriendData(data);
    router.push("/friendProfile");
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
