import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface RadomizeViewProps {
  onPressFriends: () => void;
  onPressMyFavorites: () => void;
  onPressFilter?: () => void;
}

export default function RadomizeView({
  onPressMyFavorites,
  onPressFilter,
}: RadomizeViewProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Ionicons name="restaurant-outline" size={100} color={Colors.gray1} />
        <Text style={styles.title}>Find tonights dining spot!</Text>
        <Text style={styles.description}>
          Get a recommendation from your favorite spots!
        </Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.yellowLight }]}
          onPress={onPressMyFavorites}
        >
          <View style={styles.iconTextContainer}>
            <Ionicons name="dice-outline" size={28} color={Colors.orangeDark} />
            <Text style={[styles.buttonText, { color: Colors.orangeDark }]}>
              Find tonights dining spot!
            </Text>
          </View>
        </TouchableOpacity>
        {onPressFilter && (
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: Colors.white }]}
          >
            <View style={styles.iconTextContainer}>
              <Ionicons
                name="filter-circle-outline"
                size={28}
                color={Colors.gray1}
              />
              <Text style={styles.filterButtonText}>Add filter</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 24,
  },
  options: {
    flexDirection: "column",
    justifyContent: "center",
    paddingBottom: 64,
    gap: 16,
  },
  title: {
    color: Colors.gray1,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    fontSize: 18,
    color: Colors.gray0,
    textAlign: "center",
  },
  button: {
    padding: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    alignItems: "center",
    backgroundColor: Colors.greenLight,
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Shadow for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.greenDark,
  },
  filterButtonText: {
    fontSize: 16,
    fontFamily: "SF Pro",
    color: Colors.gray1,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterButton: {
    alignSelf: "center",
    padding: 12,
    borderRadius: 999,
    borderCurve: "continuous",
    borderWidth: 1,
    borderColor: Colors.gray1,
    justifyContent: "center",
    alignItems: "center",
  },
});
