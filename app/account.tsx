import AccountPresenter from "@/presenters/AccountPresenter";
import { StyleSheet, View } from "react-native";

// TODO: Rename to settingsScreen
export default function AccountScreen() {
  return (
    // TODO: Implement Presenter
    <View style={styles.container}>
      <AccountPresenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
