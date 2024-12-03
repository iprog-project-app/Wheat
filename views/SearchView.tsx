import { PlaceListItem } from "@/components/PlaceListItem";
import { PlacePreviewSchema } from "@/constants/types";
import { SearchBar } from "@rneui/themed";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";

export interface SearchViewProps {
  searchResults: Array<
    Pick<
      PlacePreviewSchema,
      "id" | "title" | "location" | "imageUri" | "rating" | "isLiked"
    >
  >;
  searchQuery: string;
  onChangeText: (searchQuery: string) => void;
  toggleLike: (id: string) => () => void;
  onPressItem: (id: string) => () => void;
}

const SearchBarComponent = ({
  searchQuery,
  onChangeText,
}: {
  searchQuery: string;
  onChangeText: (text: string) => void;
}) => (
  <SearchBar
    key="searchBar"
    platform={Platform.OS === "ios" ? "ios" : "android"}
    placeholder="Type Here..."
    value={searchQuery}
    onChangeText={onChangeText}
  />
);

export default function SearchView({
  searchResults,
  searchQuery,
  onChangeText,
  toggleLike,
  onPressItem,
}: SearchViewProps) {
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: Colors.white }}
      data={searchResults}
      ListHeaderComponent={() => (
        <SearchBarComponent
          searchQuery={searchQuery}
          onChangeText={onChangeText}
        />
      )}
      renderItem={({ item }) => (
        <PlaceListItem
          key={item.id}
          toggleLike={toggleLike(item.id)}
          onPress={onPressItem(item.id)}
          {...item}
        />
      )}
      keyExtractor={(item) => item.title}
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
