import {Platform, Pressable, StyleSheet, Text, TextInput, View,  } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut, User, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../Config/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";

import { addUser } from "@/utilities/firebaseModel";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn(){
  const [userInfo, setUserInfo] = useState<User | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [req, res, promtAsync] = Google.useAuthRequest({
    iosClientId:"1001708917415-2vf56juoiu0g0bi8ctpi5fn3r61pf7l5.apps.googleusercontent.com",
    androidClientId:"1001708917415-ocvpdnilkd5kr2218gt05fcppa27p6ul.apps.googleusercontent.com"
  });

  const checkLocalStorage = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user")
      const data = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(data);

    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (res?.type === "success") {
      const {id_token} = res.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential);
    }
  }, [res]);

  const createUser = async () => {
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      if(userCredential) {
        const user = userCredential.user;
        console.log(user.uid);
      }
    } catch(err) {
      console.log(err)
    } 
  }

  const signInUser = async () => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      if(userCredential) {
        const user = userCredential.user;
        console.log(user.uid);
      }
    } catch(err) {
      console.log(err)
    } 
  }

  useEffect(() => {
    checkLocalStorage();
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserInfo({...user});
        await AsyncStorage.setItem("@user",JSON.stringify(user));
      }
    })

    return () => unsub();
  }, [])

  return (
    <View>
      <Text>Hej ny grej</Text>
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5 }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true} // Optional: Hides the password
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5 }}
        />
        <Pressable
          style={{ borderColor: 'gray', borderWidth: 1, padding: 10, borderRadius: 5 }}
          onPress={signInUser}
        ><Text>Create account</Text></Pressable>
      </View>

      <Pressable
      onPress={() => promtAsync()}><Text>Log in</Text></Pressable>
      {userInfo ? <View><Text>Name: {userInfo.displayName}</Text></View> : <Text>No user logged in</Text>}
      <Pressable
      onPress={async () => {
        await signOut(auth);
        await AsyncStorage.removeItem("@user");
        router.push("/(tabs)");
      }}><Text>Log out</Text></Pressable>
      <Pressable
      onPress={() => {
        addUser({
          name: "Jane Doe",
          email: "example@gmail.com",
          imgUrl: "https://example.com/jane.jpg",
          friends: ["JohnSmith123", "Alice_Wonderland", "Bob_TheBuilder"],
          favourites: [
            {
              id: "place123",
              title: "Fancy Steakhouse",
              imageUri: "https://example.com/steakhouse.jpg",
              rating: 4.5,
              location: "123 Main Street, Cityville",
              isLiked: true,
              note: "Best steak I've ever had!",
              description: "An upscale steakhouse with a cozy atmosphere.",
              price: "$$$",
              website: "https://fancysteakhouse.com",
            },
            {
              id: "place456",
              title: "Cozy Coffee Shop",
              imageUri: "https://example.com/coffeeshop.jpg",
              rating: 4.2,
              location: "45 Coffee Lane, Cityville",
              isLiked: false,
              description: "A small, locally owned coffee shop with excellent pastries.",
              price: "$",
              website: "https://cozycoffee.com",
            },
            {
              id: "place789",
              title: "Pasta Paradise",
              imageUri: "https://example.com/pasta.jpg",
              rating: 4.7,
              location: "789 Spaghetti Avenue, Cityville",
              isLiked: true,
              description: "Authentic Italian pasta dishes served fresh daily.",
              price: "$$",
              website: "https://pastaparadise.com",
            },
          ],
        });
      }}><Text>Create user</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
