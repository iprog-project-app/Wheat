import { PlaceListItem } from "@/components/PlaceListItem";
import { PlacePreviewSchema } from "@/constants/types";
import { SearchBar } from "../components/SearchBar";
import { FlatList, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import useStore from "@/model/model";

export interface SearchViewProps {
  searchResults: PlacePreviewSchema[];
  searchQuery: string;
  onChangeText: (searchQuery: string) => void;
  toggleLike: (id: string) => () => void;
  onPressItem: (id: string) => () => void;
  onSearch: () => void;
}

const SearchBarComponent = ({
  searchQuery,
  onChangeText,
  onSubmit,
}: {
  searchQuery: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) => (
  // TODO: Keyboard does not persist taps. Maybe add above FlatList: https://stackoverflow.com/questions/62148855/flatlist-search-bar-does-not-persist-keyboard-react-native
  <SearchBar
    key="searchBar"
    placeholder="Find a restaurant"
    autoFocus
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
    onSubmitEditing={() => onSubmit()}
  />
);

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Ionicons name="search" size={40} color={Colors.gray2} />
    <Text style={styles.emptyText}>
      {"Start searching to see restaurants!"}
    </Text>
  </View>
);

export default function SearchView({
  searchResults,
  searchQuery,
  onChangeText,
  toggleLike,
  onPressItem,
  onSearch,
}: SearchViewProps) {
  const { getNoteFromId } = useStore();
  const headerComponent = useMemo(
    () => (
      <SearchBarComponent
        searchQuery={searchQuery}
        onChangeText={onChangeText}
        onSubmit={onSearch}
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
      ListEmptyComponent={<EmptyState />}
      renderItem={({ item }) => (
        <PlaceListItem
          key={item.id}
          toggleLike={toggleLike(item.id)}
          onPress={onPressItem(item.id)}
          {...item}
          note={getNoteFromId(item.id)}
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
