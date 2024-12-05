import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { AnimatedButton } from "./AnimatedButton";
import useStore, { likedPlacesData } from "@/store/model";

export default function TabBar({}: BottomTabBarProps) {
  const { setActivePlaceData } = useStore();

  const handleSetRandom = () => {
    setActivePlaceData(
      likedPlacesData[Math.floor(Math.random() * likedPlacesData.length)]
    );
  };
  return (
    <View style={styles.tabBar}>
      {/* TODO: Add random modal. First implementation would just be the details modal with a random id from saved */}
      <Link href="/details" asChild onPress={handleSetRandom}>
        <AnimatedButton>
          <View style={styles.secondaryButton}>
            <Ionicons
              name="dice-outline"
              size={28}
              color={Colors.primaryDisabled}
            />
          </View>
        </AnimatedButton>
      </Link>

      <Link href="/search" asChild>
        <AnimatedButton>
          <View style={styles.mainButton}>
            <Ionicons name="search" size={40} color={Colors.white} />
          </View>
        </AnimatedButton>
      </Link>

      <AnimatedButton>
        <View style={styles.secondaryButton}>
          <Ionicons
            name="person-add-outline"
            size={28}
            color={Colors.primaryDisabled}
          />
        </View>
      </AnimatedButton>
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
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
