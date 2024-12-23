import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import InputBox from "@/components/InputBox";
import Colors from "@/constants/Colors";

export interface SignInViewProps {
  onLogIn: () => void;
  onSignUp: () => void;
  onSwitchPress: () => void;
  onEmailChange: (email: string) => void;
  onNameChange: (name: string) => void;
  onPasswordChange: (password: string) => void;
  hasAccount: boolean;
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
  error: string;
  loading: boolean;
}

export default function SignInView({
  onLogIn,
  onSignUp,
  onSwitchPress,
  onEmailChange,
  onNameChange,
  onPasswordChange,
  hasAccount,
  email,
  password,
  name,
  error,
  loading,
}: SignInViewProps) {
  return (
    <TouchableWithoutFeedback
      onPress={
        Platform.OS === "web" ? () => console.log("Dismiss") : Keyboard.dismiss
      }
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS/Android
      >
        <Image
          style={styles.logo}
          source={require("../assets/images/wheatLogo.png")}
        />
        {hasAccount ? (
          <View style={styles.inputsContainer}>
            <InputBox
              error={error}
              value={email}
              placeHolder="Email"
              onChange={onEmailChange}
            />
            <InputBox
              error={error}
              value={password}
              placeHolder="Password"
              onChange={onPasswordChange}
            />
            {error && <Text style={styles.errorMessage}>{error}</Text>}
            <TouchableOpacity onPress={onLogIn} style={styles.signButton}>
              {!loading ? (
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Log in
                </Text>
              ) : (
                <Image
                  source={require("../assets/images/buttonLoad.gif")}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputsContainer}> 
            <InputBox
              error={error}
              value={name}
              placeHolder="Name"
              onChange={onNameChange}
            />
            <InputBox
              error={error}
              value={email}
              placeHolder="Email"
              onChange={onEmailChange}
            />
            <InputBox
              error={error}
              value={password}
              placeHolder="Password"
              onChange={onPasswordChange}
            />
            {error && <Text style={styles.errorMessage}>{error}</Text>}
            <TouchableOpacity onPress={onSignUp} style={styles.signButton}>
              {!loading ? (
                <Text
                  style={{
                    color: Colors.white,
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  Create account
                </Text>
              ) : (
                <Image
                  source={require("../assets/images/buttonLoad.gif")}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={onSwitchPress}>
          <Text style={styles.toggleAccount}>
            {hasAccount ? "Create an account" : "Already have an account?"}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 50,
    paddingHorizontal: 32,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 90,
    alignSelf: "center",
  },
  toggleAccount: {
    color: Colors.gray3,
    padding: 20,
    marginTop: 20,
    alignSelf: "center",

  },
  errorMessage: {
    padding: 20,
    paddingBottom: 0,
    color: Colors.red,
    fontWeight: "bold",
    alignSelf: "center",
  },

  inputsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 16,
  },

  signButton: {
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
