import AccountView from "@/views/AccountView";
import { Alert } from "react-native";

export default function AccountPresenter() {
  const handleSignOut = () => {
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
          onPress: () => {
            // TODO: Implement sign out
            console.log("Sign out");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <AccountView
      userName="Marcus Påhlman"
      userEmail="mpahlmans@gmail.com"
      onSignOut={handleSignOut}
    />
  );
}
