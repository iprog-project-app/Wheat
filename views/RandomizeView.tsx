import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import Colors from "../constants/Colors";
import { PlaceFullSchema } from "@/constants/types";
import { useFocusEffect } from "expo-router";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import { Link } from "expo-router";

interface RadomizeViewProps {
  onPressFriends: () => void;
  onPressMyFavorites: () => void;
  onPressFilter?: () => void;
}

export default function RadomizeView({
  onPressMyFavorites,
  onPressFriends,
  onPressFilter,
}: RadomizeViewProps) {
  return (
    <View style={styles.container}>
      {/* en container för header och info om vad som händer. Flex grow. både justifyContent och alignItems center, gap= 24 */}
      <View style={styles.info}>
        <Ionicons name="restaurant-outline" size={100} color={Colors.gray1} />
        <Text style={styles.title}>Find tonights dining spot!</Text>
        <Text style={styles.description}>
          Get a recommendation from all your friends' favorite spots or just
          your own. Refine with filters to match tonight’s mood!
        </Text>
      </View>
      {/* TODO: se till att knapparna har fast height och flytande width */}
      <View style={styles.options}>
        <TouchableOpacity style={styles.button} onPress={onPressFriends}>
          <View style={styles.iconTextContainer}>
            <Ionicons name="people-outline" size={28} color={"#0B6809"} />
            <Text style={styles.buttonText}>Together with friends</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.yellowLight }]}
          onPress={onPressMyFavorites}
        >
          <View style={styles.iconTextContainer}>
            <Ionicons
              name="person-outline"
              size={28}
              color={Colors.orangeDark}
            />
            <Text style={[styles.buttonText, { color: Colors.orangeDark }]}>
              Just my favorites
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
    paddingVertical: 0,
    gap: 0,
  },
  info: {
    //backgroundColor: "red",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    gap: 24,
  },
  options: {
    //backgroundColor: "blue",

    flexDirection: "column",
    justifyContent: "center",

    paddingBottom: 64,
    gap: 16,
  },
  title: {
    color: Colors.gray1,
    fontSize: 26,
    fontFamily: "SF Pro",
    fontWeight: 700,
  },
  description: {
    fontSize: 18,
    color: Colors.gray0,
    textAlign: "center",
  },
  button: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#D6FCCF",
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "SF Pro",
    fontWeight: 700,
    color: "#0B6809",
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
    borderWidth: 1,
    borderColor: Colors.gray1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D6FCCF",
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 5,
  },
});
