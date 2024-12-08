import React, { forwardRef } from "react";
import { View } from "react-native";
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

export const AnimatedButton = forwardRef(
  (
    {
      minScale = 0.97,
      duration = 300,
      elasticity = 1.5,
      onPress,
      onLongPress,
      children,
      style,
    }: AnimatedButtonProps & View["props"],
    ref: React.Ref<View>
  ) => {
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
        opacity.value = withTiming(targetScale === 1 ? 1 : 0.9, {
          duration: 50,
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
        <Animated.View ref={ref} style={[style, animatedButtonStyle]}>
          {children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
);
