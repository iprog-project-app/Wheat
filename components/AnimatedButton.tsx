import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export interface AnimatedButtonProps {
  minScale?: number;
  duration?: number;
  elasticity?: number;
  onPress?: () => void;
  onLongPress?: () => void;
  children: React.ReactNode;
}

export function AnimatedButton({
  minScale = 0.97,
  duration = 300,
  elasticity = 1.5,
  onPress,
  onLongPress,
  children,
  style,
}: AnimatedButtonProps & View["props"]) {
  const animatedScale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: animatedScale.value }],
    opacity: opacity.value,
  }));

  const pressAnimation = (targetScale: number) => {
    return () => {
      "worklet";
      animatedScale.value = withTiming(targetScale, {
        duration,
        easing: Easing.elastic(elasticity),
      });
    };
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        pressAnimation(minScale)();
        console.log("pressIn");
      }}
      onPressOut={() => {
        pressAnimation(1)();
        console.log("pressOut");
      }}
      onPress={onPress}
      onLongPress={() => {
        console.log("longPress");
        pressAnimation(1)();
        onLongPress?.();
      }}
    >
      <Animated.View style={[style, animatedButtonStyle]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({});
