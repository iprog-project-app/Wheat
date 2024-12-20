import useStore from "@/model/storeModel";
import { updateFirebase } from "@/model/firebaseModel";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Platform, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// SIGNIN
// Firebase
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import { fetchUser } from "@/model/firebaseModel";

import SignInScreen from "./signIn";

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

  const [loading, setLoading] = useState<boolean>(false);

  const {
    friends,
    recentSearches,
    likedPlaces,
    loggedInUserId,
    setLoggedInUserId,
    setUser,
  } = useStore();
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

  // ------------------- SIGN IN ---------------------- //

  const handleAuthChange = async (user: User | null) => {
    setLoading(false);
    if (user) {
      const uid = user.uid;
      console.log(uid);
      setLoggedInUserId(uid);
      const userInfo = await fetchUser(uid);
      setUser(userInfo);
    } else {
      setLoggedInUserId("");
    }
    setLoading(true);
  };
  // ------------------- SIGN IN ---------------------- //

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, handleAuthChange);

    return () => unsub();
  }, []);

  if (!loaded) {
    return null;
  }

  return loading ? (
    loggedInUserId ? (
      <RootLayoutNav />
    ) : (
      <SignInScreen />
    )
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/loadGif.gif")}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
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
        <Stack.Screen
          name="randomize"
          options={{
            title: "Randomize a restaurant",
            presentation: "modal",
            headerShown: Platform.OS !== "ios",
          }}
        />
        <Stack.Screen name="account" options={{ title: "Account Settings" }} />
        <Stack.Screen name="friends" options={{ title: "Manage Friends" }} />
        <Stack.Screen name="signIn" />
        <Stack.Screen
          name="friendSearch"
          options={{
            title: "Search Fiends",
            presentation: "modal",
            headerShown: Platform.OS !== "ios",
          }}
        />
        <Stack.Screen
          name="friendProfile"
          options={{
            title: "Profile",
            presentation: "modal",
            headerShown: Platform.OS !== "ios",
          }}
        />
        <Stack.Screen
          name="selectFriends"
          options={{
            title: "Select Friends",
            presentation: "modal",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
