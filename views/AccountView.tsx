import { FlatList, StyleSheet, View, Text, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SettingsOption } from "@/constants/types";

export interface AccountViewProps {
  userName: string;
  userEmail: string;
  onSignOut: () => void;
}

export default function AccountView({
  userName,
  userEmail,
  onSignOut,
}: AccountViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userName}</Text>
      <Text style={styles.emailText}>{userEmail}</Text>
      <Pressable
        onPress={onSignOut}
        style={({ pressed }) => ({
          backgroundColor: pressed ? Colors.secondary : "transparent",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 999,
          marginTop: 48,
          borderCurve: "continuous",
          gap: 16,
        })}
      >
        <Ionicons name="log-out" size={24} color={Colors.primary} />
        <Text
          style={{ fontSize: 20, fontWeight: "bold", color: Colors.primary }}
        >
          Sign Out
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 48,
    gap: 16,
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  emailText: {
    fontSize: 18,
    color: Colors.gray2,
  },
});
