import { View, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AnimatedButton } from "./AnimatedButton";
import useStore from "@/model/model";

export default function TabBar({}: BottomTabBarProps) {
  const { setActivePlaceData, likedPlaces } = useStore();

  const handleSetRandom = () => {
    setActivePlaceData(
      likedPlaces[Math.floor(Math.random() * likedPlaces.length)]
    );
  };
  return (
    <View style={styles.tabBar}>
      {/* TODO: Add random modal. First implementation would just be the details modal with a random id from saved */}
      <Link
        href="/randomize"
        asChild={Platform.OS === "ios"}
        onPress={handleSetRandom}
      >
        <AnimatedButton>
          <View
            style={[
              styles.secondaryButton,
              { backgroundColor: Colors.yellowLight },
            ]}
          >
            <Ionicons name="dice-outline" size={28} color={Colors.orangeDark} />
          </View>
        </AnimatedButton>
      </Link>

      <Link href="/search" asChild={Platform.OS === "ios"}>
        <AnimatedButton>
          <View style={styles.mainButton}>
            <Ionicons name="search" size={40} color={Colors.white} />
          </View>
        </AnimatedButton>
      </Link>

      <Link href={"/friendSearch"}>
        <AnimatedButton>
          <View
            style={[
              styles.secondaryButton,
              { backgroundColor: Colors.greenLight },
            ]}
          >
            <Ionicons
              name="person-add-outline"
              size={28}
              color={Colors.greenDark}
            />
          </View>
        </AnimatedButton>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingBottom: 24,
  },
  mainButton: {
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButton: {
    width: 64,
    height: 64,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
