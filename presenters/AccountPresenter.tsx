import useStore from "@/model/storeModel";
import AccountView from "@/views/AccountView";
import { Alert, Platform } from "react-native";

// Firebase Auth
import { signOut } from "firebase/auth";
import { auth } from "@/Config/firebaseConfig";

export default function AccountPresenter() {
  const { name, email } = useStore();

  const handleSignOut = async () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to sign out?")) {
        await signOut(auth);
        console.log("Sign out");
      }
    } else {
      Alert.alert(
        "Sign out",
        "Are you sure you want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Log out",
            style: "destructive",
            onPress: async () => {
              await signOut(auth);
              console.log("Sign out");
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <AccountView userName={name} userEmail={email} onSignOut={handleSignOut} />
  );
}
