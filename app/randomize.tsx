import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View } from "react-native";
import RandomizePresenter from "@/presenters/RandomizePresenter";
import Colors from "@/constants/Colors";

export default function RandomizeScreen() {
  return (
    <View style={styles.container}>
      {/* <View style={{ height: "92%" }}>  */}
      <RandomizePresenter />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
