import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useStore } from "@/model/model";

export interface PlaceListItemProps {
  id: string;
  title: string;
  location: string;
  imageUri: string;
  rating: number;
  note?: string;
  toggleLike: () => void;
  onPress: () => void;
}

export function PlaceListItem({
  id,
  title,
  location,
  imageUri,
  rating,
  note,
  toggleLike,
  onPress,
}: PlaceListItemProps) {
  const { isLikedPlace } = useStore(); // Get access to the liked places from the store

  return (
    <View
      style={{
        backgroundColor: Colors.white,
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 20,
        alignItems: "center",
      }}
    >
      <Pressable
        hitSlop={12}
        onPress={onPress}
        style={({ pressed }) => ({
          gap: 8,
          opacity: pressed ? 0.8 : 1,
          flex: 1,
        })}
      >
        <View style={{ flexDirection: "row", gap: 16, flex: 1 }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 8,
              borderCurve: "continuous",
              overflow: "hidden",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
            <Text style={{ fontSize: 16, color: Colors.gray1 }}>
              {location}
            </Text>
            <View
              style={{ flexDirection: "row", alignContent: "center", gap: 4 }}
            >
              <Text style={{ fontSize: 16, color: Colors.gray1 }}>
                {rating}
              </Text>
              <FontAwesome name="star" size={18} color={Colors.yellow} />
            </View>
          </View>
        </View>
        {note && (
          <Text style={{ fontSize: 18, color: Colors.gray2 }} numberOfLines={2}>
            {note}
          </Text>
        )}
      </Pressable>
      <Pressable
        hitSlop={12}
        onPress={toggleLike}
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Ionicons
          name={isLikedPlace(id) ? "heart" : "heart-outline"}
          size={28}
          color={isLikedPlace(id) ? Colors.red : Colors.gray3}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  likeAction: {
    width: 120,
    backgroundColor: Colors.redLight,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  removeAction: {
    flex: 1,
    width: 120,
    backgroundColor: Colors.gray4,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  rightText: {
    color: Colors.redDark,
  },
});
