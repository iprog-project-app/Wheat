import SettingsPresenter from "@/presenters/SettingsPresenter";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";

// TODO: Rename to settingsScreen
export default function SettingsScreen() {
  return (
    // TODO: Implement Presenter
    <View style={styles.container}>
      <SettingsPresenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
