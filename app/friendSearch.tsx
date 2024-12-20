import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import FriendSearchPresenter from "@/presenters/FriendSearchPresenter";

export default function FriendSearchScreen() {
  return (
    // TODO: Allow scroll to bottom
    <View style={styles.container}>
      <FriendSearchPresenter />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
