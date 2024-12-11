import { FlatList, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SettingsOption } from "@/constants/types";

export interface SettingsViewProps {
  settingsOptions: SettingsOption[];
}

export default function SettingsView({ settingsOptions }: SettingsViewProps) {
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}
      data={settingsOptions}
      renderItem={({ item }) => (
        <Pressable
          onPress={item.onPress}
          style={({ pressed }) => ({
            backgroundColor: Colors.white,
            flexDirection: "row",
            opacity: pressed ? 0.8 : 1,
            alignItems: "center",
            padding: 16,
            gap: 16,
          })}
        >
          <Ionicons
            name={item.iconName}
            size={24}
            color={item.iconColor || Colors.primary}
          />
          <View
            style={{
              gap: 4,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ color: Colors.gray1 }}>{item.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.gray2} />
        </Pressable>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{ height: 1, width: "100%", backgroundColor: Colors.gray4 }}
        />
      )}
    />
  );
}
