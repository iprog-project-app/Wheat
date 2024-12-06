import { FlatList, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FriendSchema } from "@/constants/types";

export interface FriendsViewProps {
  friendsList: FriendSchema[];
  onRemove: (id: string) => void;
}

export default function FriendsView({
  friendsList,
  onRemove,
}: FriendsViewProps) {
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
      data={friendsList}
      renderItem={({ item }) => (
        <View
          style={{
            backgroundColor: Colors.white,
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            gap: 16,
          }}
        >
          <Ionicons name="person-circle" size={32} color={Colors.primary} />
          <View
            style={{
              gap: 4,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.name}
            </Text>
            <Text style={{ color: Colors.gray1 }}>{item.email}</Text>
          </View>
          <Pressable
            onPress={() => onRemove(item.userId)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Ionicons name="close-circle" size={24} color={Colors.red} />
          </Pressable>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{ height: 1, width: "100%", backgroundColor: Colors.gray4 }}
        />
      )}
    />
  );
}
