import { PlacePreviewSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useState } from "react";

export default function SearchPresenter() {
  // TODO: Fetch search results
  // Mock data
  const searchResults: Array<
    Pick<
      PlacePreviewSchema,
      "id" | "title" | "location" | "imageUri" | "rating" | "isLiked"
    >
  > = [
    {
      id: "omnipollos",
      title: "Omnipollos hatt",
      location: "Hökens gata 1A",
      imageUri:
        "https://thumbor.junction.travel/zOTYvRLxJ3fkKYbywkrX7EtjNHY=/1092x0/smart/https%3A%2F%2Fcontent.res.se%2Fsites%2Fdefault%2Ffiles%2Fgoogle-places%2FChIJowodOvt3X0YRjYM1JobP3Gg.jpg",
      rating: 4.5,
      isLiked: true,
    },
    {
      id: "fotografiska",
      title: "Fotografiska",
      location: "Stadsgårdshamnen 22",
      imageUri:
        "https://img.guidebook-sweden.com/stockholms-kommun/fotografiska.jpg",
      rating: 4.6,
      isLiked: false,
    },
    {
      id: "lilla-ego",
      title: "Lilla Ego",
      location: "Västmannagatan 69",
      imageUri:
        "https://www.visitstockholm.com/media/images/44b4242d91b743c9ae24862e94277205.width-1020.jpg",
      rating: 4.7,
      isLiked: false,
    },
    {
      id: "meatballs",
      title: "Meatballs for the People",
      location: "Nytorgsgatan 30",
      imageUri:
        "https://thatsup.website/storage/308/23986/responsive-images/DSCF0712___media_library_original_4000_2666.jpg",
      rating: 4.4,
      isLiked: true,
    },
    {
      id: "urban-deli",
      title: "Urban Deli",
      location: "Nytorget 4",
      imageUri:
        "https://urbandeli.org/wp-content/uploads/2020/06/urban-deli-nytorget.jpg",
      rating: 4.2,
      isLiked: false,
    },
    {
      id: "taverna-brillo",
      title: "Taverna Brillo",
      location: "Sturegatan 6",
      imageUri:
        "https://tavernabrillo.se/wp-content/uploads/2019/05/taverna-brillo-interior.jpg",
      rating: 4.3,
      isLiked: false,
    },
    {
      id: "rolfs-kok",
      title: "Rolfs Kök",
      location: "Tegnérgatan 41",
      imageUri:
        "https://rolfskök.se/wp-content/uploads/2018/09/rolfs-kok-interior.jpg",
      rating: 4.8,
      isLiked: false,
    },
    {
      id: "pharmarium",
      title: "Pharmarium",
      location: "Stortorget 7",
      imageUri:
        "https://pharmarium.se/wp-content/uploads/2019/04/pharmarium-bar.jpg",
      rating: 4.5,
      isLiked: false,
    },
  ];

  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  return (
    <SearchView
      searchQuery={search}
      searchResults={searchResults}
      onChangeText={updateSearch}
      toggleLike={(id) => () => console.log("Toggle like: ", id)} // TODO: Toggle like for item
      onPressItem={(id) => () => console.log("Press item: ", id)} // TODO: Open modal with details
    />
  );
}
