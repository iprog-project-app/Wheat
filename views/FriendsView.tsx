import { FlatList, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FriendSchema } from "@/constants/types";
import { FriendListItem } from "@/components/FriendListItem";
import useStore from "@/store/model";

export interface FriendsViewProps {
  friendsList: FriendSchema[];
  onPressSearchFriends: () => void;
  onToggleFollow: (user: FriendSchema) => void;
  onPressItem: (user: FriendSchema) => void;
}

export default function FriendsView({
  friendsList,
  onPressSearchFriends: onPressAddFriends,
  onToggleFollow,
  onPressItem,
}: FriendsViewProps) {
  const { isFriend } = useStore();

  return (
    <>
      <Pressable
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.white,
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray4,
          flexDirection: "row",
          gap: 8,
          padding: 16,
        }}
        onPress={onPressAddFriends}
      >
        <Ionicons name="add" size={32} color={Colors.gray0} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: Colors.gray0,
          }}
        >
          Add friends
        </Text>
      </Pressable>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
        data={friendsList}
        renderItem={({ item }) => (
          <FriendListItem
            onPressItem={() => onPressItem(item)}
            onToggleFollow={() => onToggleFollow(item)}
            following={isFriend(item.userId)}
            {...item}
          />
        )}
        keyExtractor={(item) => item.userId}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, width: "100%", backgroundColor: Colors.gray4 }}
          />
        )}
      />
    </>
  );
}
