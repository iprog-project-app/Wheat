import SignInPresenter from "@/presenters/SignInPresenter";
import { StyleSheet, View } from "react-native";

// TODO: Rename to settingsScreen
export default function SignInScreen() {
  return (
    // TODO: Implement Presenter
    <View style={styles.container}>
      <SignInPresenter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
