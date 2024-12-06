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
                  <Text style={styles.subtitle}>{placeData.rating} ★</Text>
                </View>
                <View style={styles.titleRow}>
                  <Text style={styles.subtitle}>⚲ {placeData.location}</Text>
                  <Text style={styles.subtitle}>{placeData.price}</Text>
                </View>
                {placeData.website && (
                  <>
                    <Text style={styles.link} onPress={onLinkPress}>
                      ⚭{placeData.website}
                    </Text>
                    <Text style={styles.description}>
                      {placeData.description}
                    </Text>
                  </>
                )}
              </View>

              {/* Notes Section */}
              <View style={styles.notesContainer}>
                <Text style={styles.notesTitle}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  placeholder="Add a note"
                  value={placeData.note}
                  onChangeText={onNoteChange}
                />
              </View>

              {/* Flexible space to push buttons to the bottom */}
              <View style={{ flex: 1 }} />
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
                <Text style={styles.backText}>❮</Text>
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={onLikeToggle}
              >
                <Text style={styles.saveText}>♥︎</Text>
                <Text style={styles.saveText}>Save</Text>
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
  },

  imageContainer: {
    alignItems: "center",
    marginVertical: 24,
  },

  image: {
    width: 345,
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  infoContainer: {
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 18,
    color: Colors.gray0,
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: Colors.gray0,
  },
  link: {
    fontSize: 18,
    color: Colors.primary,
    marginBottom: 12,
  },
  notesContainer: {
    paddingHorizontal: 24,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: Colors.gray4,
    padding: 10,
    borderRadius: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 100, //Den hamnar för långt ner utan detta, fattar ej varför
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
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
