import { Link, Tabs } from "expo-router";
import { Platform, Pressable } from "react-native";
import Colors from "../../constants/Colors";
import TabBar from "../../components/TabBar";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Saved Restaurants",
          headerRight: () => (
            <Link href="/settings" asChild={Platform.OS === "ios"}>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name="cog-outline"
                    size={28}
                    color={Colors.gray1}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
