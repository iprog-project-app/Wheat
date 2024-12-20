import RandomizeView from "@/views/RandomizeView";
import useStore from "@/model/model";
import { useState } from "react";
import { useRouter } from "expo-router";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import SelectFriendsView from "@/views/SelectFriendsView";
import { useSelectFriendsPresenter } from "@/utilities/useSelectFriendsPresenter";

export default function RandomizePresenter() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const {
    friendsAndSelected,
    selectedFriends,
    handlePressItem,
    handleToggleSelected,
    handlePressRandomize,
  } = useSelectFriendsPresenter();
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
    router.push("/selectFriends");
  };

  const handleSegmentChange = (event: any) => {
    const newIndex = event.nativeEvent.selectedSegmentIndex;
    setSelectedIndex(newIndex);
  };

  return (
    <>
      <SegmentedControl
        values={["Together with friends", "Just my favorites"]}
        selectedIndex={selectedIndex}
        onChange={handleSegmentChange}
        style={{ margin: 20 }}
      />
      {selectedIndex === 0 ? (
        <SelectFriendsView
          friendsList={friendsAndSelected}
          selectedFriends={selectedFriends}
          onPressItem={handlePressItem}
          onToggleSelected={handleToggleSelected}
          onPressRandomize={handlePressRandomize}
        />
      ) : (
        <RandomizeView
          onPressMyFavorites={handleRandomizeMy}
          onPressFriends={handleRandomizeFriends}
        />
      )}
    </>
  );
}
