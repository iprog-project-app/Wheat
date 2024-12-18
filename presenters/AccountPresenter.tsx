import useStore from "@/store/model";
import AccountView from "@/views/AccountView";
import { Alert, Platform } from "react-native";

// Firebase Auth
import { signOut } from "firebase/auth";
import { auth } from "@/Config/firebaseConfig";

export default function AccountPresenter() {
  const { name, email } = useStore();

  const handleSignOut = async () => {
    if (!(Platform.OS === "web")) {
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
    } else {
      await signOut(auth);
    }
  };

  return (
    <AccountView userName={name} userEmail={email} onSignOut={handleSignOut} />
  );
}
