import { View, StyleSheet, Pressable, Text } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export interface FriendListItemProps {
  name: string;
  email: string;
  onPressItem: () => void;
  onToggleFollow: () => void;
  following: boolean;
}

export function FriendListItem({
  name,
  email,
  onPressItem,
  onToggleFollow,
  following,
}: FriendListItemProps) {
  return (
    <Pressable
      onPress={onPressItem}
      style={{
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 16,
      }}
    >
      <Ionicons name="person-circle" size={32} color={Colors.gray1} />
      <View
        style={{
          gap: 4,
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ color: Colors.gray1 }}>{email}</Text>
      </View>
      <Pressable
        onPress={onToggleFollow}
        style={({ pressed }) => ({
          paddingVertical: 8,
          paddingHorizontal: 16,
          backgroundColor: following ? Colors.gray5 : Colors.primary,
          borderRadius: 8,
          borderCurve: "continuous",
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ color: following ? Colors.black : Colors.white }}>
          {following ? "Unfollow" : "Follow"}
        </Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    borderCurve: "continuous",
  },
});
