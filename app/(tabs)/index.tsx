import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import SavedPresenter from "@/presenters/SavedPresenter";

export default function HomeScreen() {
  return (
    // TODO: Allow scroll to bottom
    <View style={styles.container}>
      {/* <View style={{ height: "92%" }}>  */}
      <SavedPresenter />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
