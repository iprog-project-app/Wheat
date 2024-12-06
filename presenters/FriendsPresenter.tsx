import FriendsView from "@/views/FriendsView";
import { Alert } from "react-native";
import { friendList } from "@/store/model";

export default function FriendsPresenter() {
  const userFriendList = friendList;
  const handleRemoveFriend = (id: string) => {
    Alert.alert(
      "Remove Friend",
      "Are you sure you want to remove this friend?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            // TODO: Implement remove friend
            console.log("Remove friend with id: ", id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <FriendsView friendsList={userFriendList} onRemove={handleRemoveFriend} />
  );
}
