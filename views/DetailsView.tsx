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
} from "react-native";
import Colors from "../constants/Colors";
import { PlaceFullSchema } from "@/constants/types";
import { useFocusEffect } from "expo-router";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

type DetailsViewProps = {
  placeData: PlaceFullSchema | null;
  onLikeToggle: () => void;
  onNoteChange: (text: string) => void;
  onBackPress: () => void;
  onModalClose: () => void;
  onLinkPress: () => void;
  rightButtonState: "liked" | "notLiked" | "randomize";
};

export default function DetailsView({
  placeData,
  onLikeToggle,
  onNoteChange,
  onBackPress,
  onModalClose,
  onLinkPress,
  rightButtonState,
}: DetailsViewProps) {
  return (
    useFocusEffect(
      React.useCallback(() => {
        return () => {
          onModalClose();
        };
      }, [])
    ),
    (
      <View style={styles.container}>
        {!placeData ? (
          // TOTO: Fix. Will never happen with current solution.
          <Text>Loading...</Text>
        ) : (
          <>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: placeData.imageUri }}
                  style={styles.image}
                />
              </View>

              {/* Title and Information */}
              <View style={styles.infoContainer}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{placeData.title}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Text style={styles.subtitle}>{placeData.rating}</Text>
                  <FontAwesome name="star" size={18} color={Colors.yellow} />
                  <Text style={styles.subtitle}>{placeData.price}</Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=${placeData.id}`
                  )
                  }
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Ionicons
                    name="location-outline"
                    size={18}
                    color={Colors.gray0}
                  />
                  <Text style={styles.subtitle}>{placeData.location}</Text>
                  </View>
                </TouchableOpacity>

                {placeData.website && (
                    <TouchableOpacity
                    style={{ alignItems: "center", flexDirection: "row", gap: 4 }}
                    onPress={onLinkPress}
                    >
                    <Ionicons
                      name="link-outline"
                      size={18}
                      color={Colors.primary}
                    />
                    <Text style={styles.link}>{placeData.website}</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.description}>{placeData.description}</Text>
              </View>

              {/* Notes Section */}
              <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add a note"
                  value={placeData.note}
                  onChangeText={onNoteChange}
                  multiline
                />
              </View>

              {/* Flexible space to push buttons to the bottom */}
              <View style={{ flex: 1 }} />
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.Button, { backgroundColor: Colors.secondary}]} onPress={onBackPress}>
                <Ionicons name="arrow-back" size={28} color={Colors.primaryDisabled} />
                <Text style={{ color: Colors.primaryDisabled, fontSize: 18, fontWeight: "bold" }}>Back</Text>
              </TouchableOpacity>

              {rightButtonState === "liked" && (
                <TouchableOpacity
                  style={[styles.Button, { backgroundColor: Colors.redLight }]}
                  onPress={onLikeToggle}
                >
                  <Ionicons name="heart-dislike" size={28} color={Colors.red} />
                  <Text style={{ color: Colors.redDark, fontSize: 18, fontWeight: "bold" }}>Remove Save</Text>
                </TouchableOpacity>
              )}

              {rightButtonState === "notLiked" && (
                <TouchableOpacity
                  style={[styles.Button, { backgroundColor: Colors.redLight }]}
                  onPress={onLikeToggle}
                >
                  <Ionicons name="heart" size={28} color={Colors.red} />
                  <Text style={{ color: Colors.redDark, fontSize: 18, fontWeight: "bold" }}>Save</Text>
                </TouchableOpacity>
              )}

              {rightButtonState === "randomize" && (
                <TouchableOpacity
                  style={[styles.Button, { backgroundColor: Colors.yellowLight}]}
                  onPress={() => console.log("Randomize")}
                >
                  <Ionicons name="dice-outline" size={28} color={Colors.orangeDark} />
                  <Text style={{ color: Colors.orangeDark, fontSize: 18, fontWeight: "bold" }}>Randomize</Text>
                </TouchableOpacity>
              )}
            </View>
            <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
          </>
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
    gap: 16,
  },

  imageContainer: {
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    borderCurve: "continuous",
  },
  infoContainer: {
    gap: 8,
    marginVertical: 24,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    color: Colors.gray0,
  },
  description: {
    fontSize: 18,
    color: Colors.gray0,
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
  },
  notesContainer: {
    gap: 8,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.gray4,
    padding: 8,
    borderRadius: 8,
  },
  buttonContainer: {
    flexShrink: 1,
    // position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 80,
    gap: 16,
  },

  Button: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    // Shadow for iOS
    shadowColor: "#000",
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
    fontWeight: "bold",
  },
});