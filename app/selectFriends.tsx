import SelectFriendsPresenter from "@/presenters/SelectFriendsPresenter";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";

// TODO: Rename to settingsScreen
export default function SelectFriendsScreen() {
  return (
    // TODO: Implement Presenter
    <View style={styles.container}>
      <SelectFriendsPresenter />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
