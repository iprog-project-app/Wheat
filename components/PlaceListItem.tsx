import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { FontAwesome } from "@expo/vector-icons";

export interface PlaceListItemProps {
  id: string;
  title: string;
  location: string;
  imageUri: string;
  rating: number;
  isLiked: boolean;
  toggleLike: () => void;
  onPress: () => void;
}

export function PlaceListItem({
  title,
  location,
  imageUri,
  rating,
  isLiked,
  toggleLike,
  onPress,
}: PlaceListItemProps) {
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
          flexDirection: "row",
          gap: 16,
          opacity: pressed ? 0.8 : 1,
          flex: 1,
        })}
      >
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
          <Text style={{ fontSize: 16, color: Colors.gray1 }}>{location}</Text>
          <View
            style={{ flexDirection: "row", alignContent: "center", gap: 4 }}
          >
            <Text style={{ fontSize: 16, color: Colors.gray1 }}>{rating}</Text>
            <FontAwesome name="star" size={18} color={Colors.yellow} />
          </View>
        </View>
      </Pressable>
      <Pressable
        hitSlop={12}
        onPress={toggleLike}
        style={({ pressed }) => ({
          // backgroundColor: "red",
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <FontAwesome
          name="heart"
          size={24}
          color={isLiked ? Colors.red : Colors.gray4}
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
