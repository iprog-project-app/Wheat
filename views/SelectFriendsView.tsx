import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { FriendSchema } from "@/constants/types";
import { FriendListItem } from "@/components/FriendListItem";

export interface SelectFriendsViewProps {
  friendsList: FriendSchema[];
  selectedFriends: FriendSchema[] | undefined;
  onToggleSelected: (user: FriendSchema) => void;
  onPressItem: (user: FriendSchema) => void;
  onPressRandomize: () => void;
}

export default function SelectFriendsView({
  friendsList,
  selectedFriends = [],
  onToggleSelected,
  onPressItem,
  onPressRandomize,
}: SelectFriendsViewProps) {
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}
        data={friendsList}
        renderItem={({ item }) => (
          <FriendListItem
            name={item.name}
            onPressItem={() => onPressItem(item)}
            onButtonPress={() => onToggleSelected(item)}
            selected={selectedFriends.includes(item)}
          />
        )}
        keyExtractor={(item) => item.userId}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, width: "100%", backgroundColor: Colors.gray4 }}
          />
        )}
      />
      <TouchableOpacity style={[styles.button]} onPress={onPressRandomize}>
        <View style={styles.iconTextContainer}>
          <Ionicons name="dice-outline" size={28} color={Colors.greenDark} />
          <Text style={[styles.buttonText, { color: Colors.greenDark }]}>
            Find tonights dining spot!
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    bottom: 64,
    marginHorizontal: 32,
    marginVertical: 16,
    padding: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    alignItems: "center",
    backgroundColor: Colors.greenLight,
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.greenDark,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
