import { router } from "expo-router";
import SettingsView from "@/views/SettingsView";
import { SettingsOption } from "@/constants/types";

export default function SettingsPresenter() {
  const settingsOptions = [
    {
      title: "Account",
      description: "Manage your account settings",
      iconName: "person",
      onPress: () => router.push("/account"),
    },
    {
      title: "Friends",
      description: "Manage your friends list",
      iconName: "people",
      onPress: () => router.push("/friends"),
    },
  ] satisfies SettingsOption[];

  return <SettingsView settingsOptions={settingsOptions} />;
}
