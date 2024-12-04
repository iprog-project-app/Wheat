import { PlacePreviewSchema } from "@/constants/types";
import SearchView from "../views/SearchView";
import { useState } from "react";

export default function SearchPresenter() {
  // TODO: Fetch search results
  // Mock data (this would represent all places in the database) but we would fetch based on a query (I guess)
  const placesData: PlacePreviewSchema[] = [
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
        "https://www.axfood.com/globalassets/startsida/om-axfood/axfoodfamiljen/urbandeli_puff1.jpg?preset=standard-page-main-image",
      rating: 4.2,
      isLiked: false,
    },
    {
      id: "taverna-brillo",
      title: "Taverna Brillo",
      location: "Sturegatan 6",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDK0tR0DjwV8FLknfpAz4u1uwBM8_2aeEFQ&s",
      rating: 4.3,
      isLiked: false,
    },
    {
      id: "rolfs-kok",
      title: "Rolfs Kök",
      location: "Tegnérgatan 41",
      imageUri:
        "https://www.restaurangguidestockholm.se/media/k2/items/cache/b4787a4a5d6711adf08fa27fc1cba139_XL.jpg",
      rating: 4.8,
      isLiked: false,
    },
    {
      id: "pharmarium",
      title: "Pharmarium",
      location: "Stortorget 7",
      imageUri:
        "https://i.shgcdn.com/4921247e-c08c-424f-9bdd-6d0bfbbdee09/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      rating: 4.5,
      isLiked: false,
    },
    {
      id: "grodan",
      title: "Grodan",
      location: "Grev Turegatan 16",
      imageUri: "",
      rating: 4.3,
      isLiked: false,
    },
    {
      id: "pelikan",
      title: "Pelikan",
      location: "Blekingegatan 40",
      imageUri: "",
      rating: 4.4,
      isLiked: true,
    },
    {
      id: "operakallaren",
      title: "Operakällaren",
      location: "Karl XII:s torg",
      imageUri: "",
      rating: 4.7,
      isLiked: false,
    },
    {
      id: "sturehof",
      title: "Sturehof",
      location: "Stureplan 2",
      imageUri: "",
      rating: 4.5,
      isLiked: true,
    },
    {
      id: "riche",
      title: "Riche",
      location: "Birger Jarlsgatan 4",
      imageUri: "",
      rating: 4.6,
      isLiked: false,
    },
  ];

  // TODO: Fetch recent searches from model (not needed though, it works without)
  // Mock recent searches
  const recentSearches = [
    "omnipollos",
    "fotografiska",
    "lilla-ego",
    "meatballs",
  ];

  function idToItem(id: string) {
    return placesData.find((item) => item.id === id);
  }

  const sortResults = (
    results: Array<PlacePreviewSchema>
  ): Array<PlacePreviewSchema> => {
    return results.sort((a, b) => a.title.localeCompare(b.title));
  };

  const recentSearchesData = recentSearches
    .map((id) => idToItem(id))
    .filter((item): item is PlacePreviewSchema => item !== undefined);

  const [search, setSearch] = useState("");

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  // TODO: Implement search, but through the API
  // Mock search
  const searchResults = placesData.filter((item) =>
    item.title.toLowerCase().startsWith(search.toLowerCase())
  );

  const sortedResults = sortResults(searchResults);

  return (
    <SearchView
      searchQuery={search}
      searchResults={search ? sortedResults : recentSearchesData}
      onChangeText={updateSearch}
      toggleLike={(id) => () => console.log("Toggle like: ", id)} // TODO: Toggle like for item
      onPressItem={(id) => () => console.log("Press item: ", id)} // TODO: Open modal with details
    />
  );
}
