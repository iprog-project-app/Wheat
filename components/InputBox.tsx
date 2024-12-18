import { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import Colors from "@/constants/Colors";

interface inputProps {
  placeHolder: string;
  value: string | undefined;
  error: string;
  onChange: (info: string) => void;
}

export default function InputBox({
  placeHolder,
  onChange,
  value,
  error,
}: inputProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View>
      <TextInput
        placeholder={placeHolder}
        placeholderTextColor={isFocused ? Colors.primary : Colors.gray3}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={(text) => onChange(text)}
        value={value}
        autoCapitalize={placeHolder === "Name" ? "sentences" : "none"}
        secureTextEntry={placeHolder === "Password"}
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
        ]}
      />
    </View>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    padding: 15,
    height: 50,
    backgroundColor: Colors.gray5,
    width: width * 0.85,
    marginTop: 16,
    borderRadius: 8,
    borderColor: "red",
    alignSelf: "center",
  },
  focused: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  error: {
    borderWidth: 1,
    borderColor: Colors.red,
    backgroundColor: Colors.redLight,
  },
});
