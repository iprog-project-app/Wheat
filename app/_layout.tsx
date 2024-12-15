import useStore from "@/store/model";
import { updateFirebase } from "@/utilities/firebaseModel";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on modals keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const { friends, recentSearches, likedPlaces } = useStore();
  const storeState = useStore();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    updateFirebase(storeState);
  }, [friends, recentSearches, likedPlaces]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <GestureHandlerRootView>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Saved Restaurants",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings"
          options={{ title: "Settings", presentation: "modal" }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: "Search",
            presentation: "modal",
            headerShown: Platform.OS !== "ios",
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            title: "Restaurant Details",
            presentation: "modal",
            headerShown: Platform.OS !== "ios",
          }}
        />
        <Stack.Screen name="account" options={{ title: "Account Settings" }} />
        <Stack.Screen name="friends" options={{ title: "Manage Friends" }} />
        <Stack.Screen name="signIn" />
      </Stack>
    </GestureHandlerRootView>
  );
}
