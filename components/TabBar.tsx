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

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gray4,
  },
  tabBarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  FAB: {
    width: 80,
    height: 80,
    marginTop: -40,
    borderRadius: 999,
    backgroundColor: Colors.primary,
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
      <TouchableOpacity
        accessibilityState={state.index === 0 ? { selected: true } : {}}
        accessibilityLabel={
          descriptors[state.routes[0].key].options.tabBarAccessibilityLabel
        }
        testID={descriptors[state.routes[0].key].options.tabBarButtonTestID}
        onPress={() => navigation.navigate(state.routes[0].name)}
        onLongPress={() =>
          navigation.emit({ type: "tabLongPress", target: state.routes[0].key })
        }
        style={styles.tabBarItem}
      >
        {icons[state.routes[0].name]({
          color: state.index === 0 ? Colors.primary : Colors.gray0,
        })}
        <Text
          style={{ color: state.index === 0 ? Colors.primary : Colors.gray0 }}
        >
          {getLabel(
            state.routes[0],
            descriptors[state.routes[0].key],
            state.index === 0
          )}
        </Text>
      </TouchableOpacity>

      <Animated.View style={animatedStyle}>
        {/* Ändrat länken från search till details för testning */}
        <Link href="/details" asChild> 
          <Pressable
            style={styles.FAB}
            onPressIn={() => {
              scale.value = withSpring(0.95, { stiffness: 300 });
            }}
            onPressOut={() => {
              scale.value = withSpring(1, { stiffness: 300 });
            }}
          >
            <FontAwesome name="search" size={28} color={Colors.white} />
          </Pressable>
        </Link>
      </Animated.View>

      <TouchableOpacity
        accessibilityState={state.index === 1 ? { selected: true } : {}}
        accessibilityLabel={
          descriptors[state.routes[1].key].options.tabBarAccessibilityLabel
        }
        testID={descriptors[state.routes[1].key].options.tabBarButtonTestID}
        onPress={() => navigation.navigate(state.routes[1].name)}
        onLongPress={() =>
          navigation.emit({ type: "tabLongPress", target: state.routes[1].key })
        }
        style={styles.tabBarItem}
      >
        {icons[state.routes[1].name]({
          color: state.index === 1 ? Colors.primary : Colors.gray0,
        })}
        <Text
          style={{ color: state.index === 1 ? Colors.primary : Colors.gray0 }}
        >
          {getLabel(
            state.routes[1],
            descriptors[state.routes[1].key],
            state.index === 1
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
