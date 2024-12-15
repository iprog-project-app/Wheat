import { Link, Tabs } from "expo-router";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";
import TabBar from "../../components/TabBar";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Saved Restaurants",
          headerRight: () => (
            <Link href="/settings" asChild={Platform.OS === "ios"}>
              <TouchableWithoutFeedback>
                <Ionicons
                  name="cog-outline"
                  size={28}
                  color={Colors.gray1}
                  style={{ marginRight: 15, opacity: 1 }}
                />
              </TouchableWithoutFeedback>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
