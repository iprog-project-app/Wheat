import { updateDoc, getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/Config/firebaseConfig";
import { FriendSchema, PlaceFullSchema } from "@/constants/types";
import { StoreSchema, UserSchema } from "@/constants/types";

export const addUser = async (user: UserSchema, uid: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      ...user,
    });
    console.log("Document written!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const fetchUser = async (uid: string) => {
  try {
    const userSnapshot = await getDoc(doc(db, "users", uid));
    const userData = userSnapshot.data();
    return userData as UserSchema;
  } catch (err) {
    console.error("Error fetching document: ", err);
  }
};

export const updateFirebase = async (storeState: StoreSchema) => {
  const uid = storeState.loggedInUserId;

  if (uid) {
    try {
      console.log("Updating...");
      const updateData = {
        friends: storeState.friends,
        recentSearches: storeState.recentSearches,
        likedPlaces: storeState.likedPlaces,
      };

      await updateDoc(doc(db, "users", uid), updateData);
      console.log("Done updating");
    } catch (err) {
      console.error("Failed to update firebase: ", err);
    }
  }
};

// Representerar att vi fetchat likedPlaces från Firebase
export const likedPlacesData: PlaceFullSchema[] = [
    {
      id: "ChIJowodOvt3X0YRjYM1JobP3Gg",
      title: "Omnipollos hatt",
      location: "Hökens gata 1A",
      imageUri:
        "https://thumbor.junction.travel/zOTYvRLxJ3fkKYbywkrX7EtjNHY=/1092x0/smart/https%3A%2F%2Fcontent.res.se%2Fsites%2Fdefault%2Ffiles%2Fgoogle-places%2FChIJowodOvt3X0YRjYM1JobP3Gg.jpg",
      rating: 4.5,
      note: "Marcus favoritställe! Bästa ölen och bästa pizzan! (Prova “slush-ölen”!!)",
      description:
        "Omnipollos hatt är en pizzeria och bryggeri som ligger på Folkungagatan på Södermalm i Stockholm. Pizzerian är känd för sina udda pizzakreationer och bryggeriet för sina öl. Pizzerian har funnits sedan 2014 och bryggeriet sedan 2011.",
      price: "$$",
      website: "https://omnipolloshatt.se/",
    },
    {
      id: "fotografiska",
      title: "Fotografiska",
      location: "Stadsgårdshamnen 22",
      imageUri:
        "https://img.guidebook-sweden.com/stockholms-kommun/fotografiska.jpg",
      rating: 4.6,
      description:
        "Fotografiska är en internationell mötesplats om och för fotografi i Stockholm. Här visas utställningar av världens främsta fotografer.",
      price: "$$",
      website: "https://www.fotografiska.com/sto/",
    },
    {
      id: "lilla-ego",
      title: "Lilla Ego",
      location: "Västmannagatan 69",
      imageUri:
        "https://www.visitstockholm.com/media/images/44b4242d91b743c9ae24862e94277205.width-1020.jpg",
      rating: 4.7,
      note: "Undvik till varje pris! Jag tycker minsann de har lite för stora egon på detta ställe",
      description:
        "Lilla Ego är en restaurang på Västmannagatan i Stockholm som serverar modern svensk mat. Restaurangen är känd för sin avslappnade atmosfär och höga kvalitet på maten.",
      price: "$$$",
      website: "https://www.lillaego.com/",
    },
    {
      id: "meatballs",
      title: "Meatballs for the People",
      location: "Nytorgsgatan 30",
      imageUri:
        "https://thatsup.website/storage/308/23986/responsive-images/DSCF0712___media_library_original_4000_2666.jpg",
      rating: 4.4,
      description:
        "Meatballs for the People är en restaurang på Södermalm i Stockholm som specialiserar sig på köttbullar. Här kan du njuta av köttbullar i olika varianter och med olika tillbehör.",
      price: "$$",
      website: "https://www.meatball.se/",
    },
    {
      id: "urban-deli",
      title: "Urban Deli",
      location: "Nytorget 4",
      imageUri:
        "https://www.axfood.com/globalassets/startsida/om-axfood/axfoodfamiljen/urbandeli_puff1.jpg?preset=standard-page-main-image",
      rating: 4.2,
      description:
        "Urban Deli är en kombination av restaurang, bar, matbutik och saluhall. Här kan du njuta av god mat och dryck i en avslappnad miljö.",
      price: "$$",
      website: "https://www.urbandeli.org/",
    },
    {
      id: "taverna-brillo",
      title: "Taverna Brillo",
      location: "Sturegatan 6",
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXDK0tR0DjwV8FLknfpAz4u1uwBM8_2aeEFQ&s",
      rating: 4.3,
      description:
        "Taverna Brillo är en restaurang och bar på Stureplan i Stockholm. Här serveras italiensk mat i en livlig och social miljö.",
      price: "$$$",
      website: "https://www.tavernabrillo.se/",
    },
    {
      id: "rolfs-kok",
      title: "Rolfs Kök",
      location: "Tegnérgatan 41",
      imageUri:
        "https://www.restaurangguidestockholm.se/media/k2/items/cache/b4787a4a5d6711adf08fa27fc1cba139_XL.jpg",
      rating: 4.8,
      description:
        "Rolfs Kök är en restaurang på Tegnérgatan i Stockholm som serverar modern svensk mat. Restaurangen är känd för sin höga kvalitet på maten och sin trevliga atmosfär.",
      price: "$$$",
      website: "https://www.rolfskok.se/",
    },
    {
      id: "pharmarium",
      title: "Pharmarium",
      location: "Stortorget 7",
      imageUri:
        "https://i.shgcdn.com/4921247e-c08c-424f-9bdd-6d0bfbbdee09/-/format/auto/-/preview/3000x3000/-/quality/lighter/",
      rating: 4.5,
      description:
        "Pharmarium är en cocktailbar och restaurang på Stortorget i Gamla Stan, Stockholm. Här kan du njuta av innovativa cocktails och god mat i en historisk miljö.",
      price: "$$$",
      website: "https://www.pharmarium.se/",
    },
    {
      id: "grodan",
      title: "Grodan",
      location: "Grev Turegatan 16",
      imageUri: "",
      rating: 4.3,
      description:
        "Grodan är en klassisk restaurang och bar på Grev Turegatan i Stockholm. Här serveras traditionell svensk mat i en elegant miljö.",
      price: "$$$",
      website: "https://www.grodan.se/",
    },
    {
      id: "pelikan",
      title: "Pelikan",
      location: "Blekingegatan 40",
      imageUri: "",
      rating: 4.4,
      description:
        "Pelikan är en traditionell svensk restaurang på Södermalm i Stockholm. Här kan du njuta av klassiska svenska rätter i en historisk miljö.",
      price: "$$",
      website: "https://www.pelikan.se/",
    },
    {
      id: "operakallaren",
      title: "Operakällaren",
      location: "Karl XII:s torg",
      imageUri: "",
      rating: 4.7,
      description:
        "Operakällaren är en av Stockholms mest kända och exklusiva restauranger. Här serveras gourmetmat i en elegant och historisk miljö.",
      price: "$$$$",
      website: "https://www.operakallaren.se/",
    },
    {
      id: "sturehof",
      title: "Sturehof",
      location: "Stureplan 2",
      imageUri: "",
      rating: 4.5,
      description:
        "Sturehof är en klassisk restaurang på Stureplan i Stockholm. Här serveras fisk och skaldjur i en livlig och social miljö.",
      price: "$$$",
      website: "https://www.sturehof.com/",
    },
    {
      id: "riche",
      title: "Riche",
      location: "Birger Jarlsgatan 4",
      imageUri: "",
      rating: 4.6,
      description:
        "Riche är en klassisk restaurang och bar på Birger Jarlsgatan i Stockholm. Här serveras traditionell svensk mat i en livlig och social miljö.",
      price: "$$$",
      website: "https://www.riche.se/",
    },
  ];
//   setLikedPlaces(likedPlacesData)

  // Mock data
  export const friendList = [
    {
      userId: "1",
      name: "Samuel de Luna",
      email: "fhdioahiohs@hotmail.com",
    },
    {
      userId: "2",
      name: "Marcus Påhlman",
      email: "jkfdjkf@gmail.com",
    },
    {
      userId: "3",
      name: "Elias Flowtang",
      email: "goOutNbang@xxx.se",
    },
    {
      userId: "4",
      name: "Victor Fredrichzoon",
      email: "coolguy@hotmale.com",
    },
  ] satisfies FriendSchema[];
  // set för friends också
