import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/Colors";

export default function DetailsView() {
  // Mock data
  const mockData = {
    title: "Waipo Mood",
    description: "Waipo means Grandma in Chinese & is an appropriate name for this homey & welcoming restaurant.",
    location: "Jakobsbergsgatan 15",
    rating: 4.2,
    price: "$$",
    imageUri: "https://media-cdn.tripadvisor.com/media/photo-s/16/6e/ce/8f/picture-from-waipo-stockholm.jpg", 
    webLink: "https://waipo.se",
    isLiked: true,
    note: "",
  };

  
  return (
    <View style={styles.container}>
      <ScrollView  style={{ flex: 1 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: mockData.imageUri }} style={styles.image} />
        </View>

        {/* Title and Information */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{mockData.title}</Text>
            <Text style={styles.subtitle}>{mockData.rating} ★</Text>
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.subtitle}>⚲ {mockData.location}</Text> 
            <Text style={styles.subtitle}>{mockData.price}</Text>
          </View>
          <Text style={styles.link} onPress={() => console.log("Open link")}>⚭ 
            {mockData.webLink}
          </Text>
          <Text style={styles.description}>{mockData.description}</Text>
        </View>

        {/* Notes Section */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add a note"
            value={mockData.note}
            onChangeText={(text) => console.log("Note changed:", text)}
          />
        </View>

        {/* Flexible space to push buttons to the bottom */}
        <View style={{ flex: 1 }} />
      </ScrollView>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => console.log("Go Back")}>
          <Text style={styles.backText}>❮</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={() => console.log("Save pressed")}>
          <Text style={styles.saveText}>♥︎</Text>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
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
    marginBottom: 12
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
  position: 'absolute',
  bottom: 100, //Den hamnar för långt ner utan detta, fattar ej varför
  flexDirection: 'row',
  justifyContent: 'space-between',
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
