import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as WebBrowser from "expo-web-browser";

import {
  onAuthStateChanged,
  signOut,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Config/firebaseConfig";

import { useEffect, useState } from "react";
import { router } from "expo-router";

import { addUser } from "@/utilities/firebaseModel";

export default function SignIn() {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const createUser = async () => {
    if (email && password && name) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          const user = userCredential.user;
          addUser(
            {
              name: name,
              email: email,
              imgUrl: "No img",
              friends: [],
              favourites: [],
              recentSearches: [],
            },
            user.uid
          );
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Fill in eveything!");
    }
  };

  const handleSwitchScreen = () => {
    setHasAccount(!hasAccount);
    setEmail(null);
    setPassword(null);
    setName(null);
  };

  // Email passsword
  const signInUser = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (userCredential) {
          const user = userCredential.user;
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Fill in everything");
    }
  };

  const handleAuthChange = async (user: User | null) => {
    if (user) {
      setUserId(user.uid);
    }
  };

  useEffect(() => {
    //checkLocalStorage();
    const unsub = onAuthStateChanged(auth, handleAuthChange);

    return () => unsub();
  }, []);

  return (
    <View>
      {hasAccount ? (
        <View>
          <Text>Log in</Text>
          <View>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email || ""}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              value={password || ""}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
            />
            <Pressable
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={signInUser}
            >
              <Text>Log in</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <Text>Create an account</Text>
          <View>
            <TextInput
              placeholder="Name"
              onChangeText={(text) => setName(text)}
              value={name || ""}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
            />

            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email || ""}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
            />
            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              value={password || ""}
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
            />
            <Pressable
              style={{
                borderColor: "gray",
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
              }}
              onPress={createUser}
            >
              <Text>Create account</Text>
            </Pressable>
          </View>
        </View>
      )}

      <Pressable onPress={handleSwitchScreen}>
        <Text>
          {hasAccount ? "Create account" : "Already have an account?"}
        </Text>
      </Pressable>

      {userId ? (
        <View>
          <Text>Name: {userId}</Text>
        </View>
      ) : (
        <Text>No user logged in</Text>
      )}
      <Pressable
        onPress={async () => {
          await signOut(auth);
          router.push("/(tabs)");
        }}
      >
        <Text>Log out</Text>
      </Pressable>
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
