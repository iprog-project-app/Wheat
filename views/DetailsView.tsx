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
};

export default function DetailsView({
  placeData,
  onLikeToggle,
  onNoteChange,
  onBackPress,
  onModalClose,
  onLinkPress,
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
                <View>
                  <Text style={styles.subtitle}>
                    {placeData.rating}{" "}
                    <FontAwesome name="star" size={18} color={Colors.yellow} />{" "}
                    {placeData.price}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      `https://www.google.com/maps/search/?api=1&query=<address>&query_place_id=${placeData.id}`
                    )
                  }
                >
                  <Text style={styles.subtitle}>
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color={Colors.gray0}
                    />{" "}
                    {placeData.location}
                  </Text>
                </TouchableOpacity>

                {placeData.website && (
                  <TouchableOpacity
                    style={{ alignItems: "center", flexDirection: "row" }}
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
              <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                <Ionicons name="arrow-back" size={24} color="#4F6CA6" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: "#FFCBCB" }]}
                onPress={onLikeToggle}
              >
                <Ionicons
                  name={placeData.isLiked ? "heart-dislike" : "heart"}
                  size={28}
                  color={placeData.isLiked ? Colors.red : Colors.red}
                />
                <Text style={styles.saveText}>
                  {placeData.isLiked ? "Remove Save" : "Save"}
                </Text>
              </TouchableOpacity>
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
  },
  backButton: {
    flex: 1,
    marginRight: 8,
    padding: 18,
    backgroundColor: "#e2ecfe",
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
  saveButton: {
    flex: 1,
    marginLeft: 8,
    padding: 16,
    backgroundColor: "#FFCBCB",
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
  backText: {
    color: "#4F6CA6",
    fontSize: 18,
    fontWeight: "bold",
  },
  saveText: {
    color: "#A71A1A",
    fontSize: 18,
    fontWeight: "bold",
  },
});
