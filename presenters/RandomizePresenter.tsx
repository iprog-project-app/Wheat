import RandomizeView from "@/views/RandomizeView";
import useStore from "@/store/model";
import { useRouter } from "expo-router";

export default function RandomizePresenter() {

  const likedPlaces = useStore((state) => state.likedPlaces);

  const setActivePlaceData = useStore((state) => state.setActivePlaceData);

  const router = useRouter();

  const handleRandomizeMy = () => {
    const randomPlace =
      likedPlaces[Math.floor(Math.random() * likedPlaces.length)];
    setActivePlaceData(randomPlace);
    console.log("pressed Just my favorites");
    //TODO add a check if the random place is the same as the current active place
    router.push({
      pathname: "/details",
      params: { source: "randomize" },
    });
  };

  const handleRandomizeFriends = () => {
    console.log("pressed With Friends");
  };

  //TODO: lägg till onPressFilter handler om vi hinner

  return (
    <RandomizeView
      onPressMyFavorites={handleRandomizeMy}
      onPressFriends={handleRandomizeFriends}
    />
  );
}
