import { View, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";

export function LoadingState() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/loadGif.gif")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
