import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

export interface AnimatedButtonProps {
  scale: number;
}

export function AnimatedButton({ scale }: AnimatedButtonProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    borderCurve: "continuous",
  },
});
