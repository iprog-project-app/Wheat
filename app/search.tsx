import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import SearchPresenter from "../presenters/SearchPresenter";

export default function SearchScreen() {
  return (
    // TODO: Allow scroll to bottom
    <View style={styles.container}>
      {/* <View style={{ height: "92%" }}>  */}
      <SearchPresenter />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
