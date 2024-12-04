import { PlaceListItem } from "@/components/PlaceListItem";
import { PlacePreviewSchema } from "@/constants/types";
import { SearchBar } from "@rneui/themed";
import { FlatList, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { useMemo } from "react";
import { FontAwesome } from "@expo/vector-icons";

export interface SearchViewProps {
  searchResults: PlacePreviewSchema[];
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
  // TODO: Keyboard does not persist taps. Maybe add above FlatList: https://stackoverflow.com/questions/62148855/flatlist-search-bar-does-not-persist-keyboard-react-native
  <SearchBar
    key="searchBar"
    platform="default"
    placeholder="Type Here..."
    value={searchQuery}
    onChangeText={onChangeText}
    containerStyle={{
      padding: 16,
      backgroundColor: Colors.white,
      borderTopWidth: 0,
      borderBottomWidth: 0,
    }}
    inputContainerStyle={{
      backgroundColor: Colors.gray5,
      borderRadius: 8,
      borderCurve: "continuous",
    }}
    inputStyle={{
      color: Colors.black,
    }}
    clearIcon={{ color: Colors.gray2, size: 20 }}
    searchIcon={{
      color: Colors.gray2,
      size: 24,
      hitSlop: 8,
    }}
  />
);

const EmptyState = ({ searchQuery }: { searchQuery: string }) => (
  <View style={styles.emptyContainer}>
    <FontAwesome name="search" size={40} color={Colors.gray2} />
    <Text style={styles.emptyText}>
      {searchQuery
        ? "No results found.\nTry a different search."
        : "Start searching to see restaurants!"}
    </Text>
  </View>
);

export default function SearchView({
  searchResults,
  searchQuery,
  onChangeText,
  toggleLike,
  onPressItem,
}: SearchViewProps) {
  const headerComponent = useMemo(
    () => (
      <SearchBarComponent
        searchQuery={searchQuery}
        onChangeText={onChangeText}
      />
    ),
    [searchQuery, onChangeText]
  );

  return (
    // TODO: Allow scroll to bottom
    <FlatList
      style={{
        backgroundColor: Colors.white,
      }}
      contentContainerStyle={{ marginBottom: 32 }}
      data={searchResults}
      ListHeaderComponent={headerComponent}
      stickyHeaderIndices={[0]}
      ListEmptyComponent={<EmptyState searchQuery={searchQuery} />}
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
