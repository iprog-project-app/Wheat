// React
import { StyleSheet } from "react-native";
import { useState } from "react";

// Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../Config/firebaseConfig";
import { addUser } from "@/model/firebaseModel";

import SignInView from "@/views/SignInView";

export default function SignInPresenter() {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [newName, setNewName] = useState<string | undefined>(undefined);
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleError = (error: string) => {
    const errorString = error.slice(5).replace("-", " ");
    const result = errorString[0].toUpperCase() + errorString.slice(1);
    setError(result);
  };

  const createUser = async () => {
    setLoading(true);
    if (email && password && newName) {
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
              name: newName,
              email: email,
              imgUrl: "No img",
              friends: [],
              likedPlaces: [],
              recentSearches: [],
            },
            user.uid
          );
        }
      } catch (err: any) {
        handleError(err.code);
      }
    } else {
      setError("You need to fill out every field!");
    }
    setLoading(false);
  };

  const handleSwitchScreen = async () => {
    setHasAccount(!hasAccount);
    setError("");
  };

  // Email passsword
  const signInUser = async () => {
    setLoading(true);
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
      } catch (err: any) {
        handleError(err.code);
      }
    } else {
      setError("You need to fill out every field!");
    }
    setLoading(false);
  };

  return (
    <SignInView
      error={error}
      onLogIn={signInUser}
      onSignUp={createUser}
      onSwitchPress={handleSwitchScreen}
      onNameChange={setNewName}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      hasAccount={hasAccount}
      email={email}
      password={password}
      name={newName}
      loading={loading}
    />
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
