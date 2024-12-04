import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";

import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Link } from "expo-router";
import { AnimatedButton } from "./AnimatedButton";

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

const icons: { [key: string]: (props: any) => JSX.Element } = {
  index: (props) => (
    <FontAwesome name="home" size={28} color={Colors.gray0} {...props} />
  ),
  saved: (props) => (
    <FontAwesome name="star" size={28} color={Colors.gray0} {...props} />
  ),
};

const getLabel = (route: any, descriptor: any, focused: boolean) => {
  const label = descriptor.options.title ?? route.name;
  if (typeof label === "function") {
    return label({
      focused,
      color: "",
      position: "below-icon",
      children: route.name,
    });
  }
  return label;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.tabBar}>
      {/* TODO: Add random modal. First implementation would just be the details modal with a random id from saved */}
      <Link href="/" asChild>
        <AnimatedButton style={animatedStyle}>
          <View style={styles.secondaryButton}>
            <FontAwesome
              name="random"
              size={28}
              color={Colors.primaryDisabled}
            />
          </View>
        </AnimatedButton>
      </Link>

      <Link href="/search" asChild>
        <AnimatedButton style={animatedStyle}>
          <View style={styles.mainButton}>
            <FontAwesome name="plus" size={32} color={Colors.white} />
          </View>
        </AnimatedButton>
      </Link>

      <AnimatedButton style={animatedStyle}>
        <View style={styles.secondaryButton}>
          <FontAwesome name="filter" size={28} color={Colors.primaryDisabled} />
        </View>
      </AnimatedButton>
    </View>
  );
}
