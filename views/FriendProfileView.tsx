import { PlaceListItem } from "@/components/PlaceListItem";
import { FriendSchema, PlacePreviewSchema } from "@/constants/types";
import { SearchBar } from "../components/SearchBar";
import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";

export interface FriendProfileViewProps {
  name: string;
  isFollowing: boolean;
  places: PlacePreviewSchema[] | undefined;
  onToggleFollow: () => void;
  toggleLike: (id: string) => () => void;
  onPressItem: (id: string) => () => void;
}

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name={"restaurant-outline"} size={40} color={Colors.gray2} />
    <Text style={styles.emptyText}>
      {"This user does not have any liked places."}
    </Text>
  </View>
);

export default function FriendProfileView({
  name,
  places,
  isFollowing,
  onToggleFollow,
  toggleLike,
  onPressItem,
}: FriendProfileViewProps) {
  return (
    // TODO: Allow scroll to bottom
    <FlatList
      style={{
        width: "100%",
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{ marginBottom: 32 }}
      data={places}
      ListHeaderComponent={
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 32,
            flexDirection: "row",
            gap: 16,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: Colors.gray4,
          }}
        >
          <Ionicons name="person-circle" size={64} color={Colors.gray1} />
          <View style={{ gap: 8, justifyContent: "center" }}>
            <Text style={styles.title}>{name}</Text>
            {/* TODO: make pressable flexShrink. Now it is as far as the name of the user */}
            <Pressable
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: isFollowing ? Colors.gray5 : Colors.primary,
                borderRadius: 8,
                borderCurve: "continuous",
              }}
              onPress={onToggleFollow}
            >
              <Text
                style={{
                  color: isFollowing ? Colors.black : Colors.white,
                  textAlign: "center",
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Text>
            </Pressable>
          </View>
        </View>
      }
      ListEmptyComponent={<EmptyState />}
      renderItem={({ item }) => (
        <PlaceListItem
          key={item.id}
          toggleLike={toggleLike(item.id)}
          onPress={onPressItem(item.id)}
          {...item}
        />
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={{ height: 1, width: "100%", backgroundColor: Colors.gray4 }}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyContainer: {
    paddingTop: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray2,
    textAlign: "center",
  },
});
