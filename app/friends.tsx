import FriendsPresenter from "@/presenters/FriendsPresenter";
import { StyleSheet, View } from "react-native";

// TODO: Rename to settingsScreen
export default function FriendsScreen() {
  return (
    // TODO: Implement Presenter
    <View style={styles.container}>
      <FriendsPresenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
