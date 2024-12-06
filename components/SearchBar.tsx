import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ReturnKeyTypeOptions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  containerStyle?: React.ComponentProps<typeof View>["style"];
  inputContainerStyle?: React.ComponentProps<typeof View>["style"];
  returnKeyLabel?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputContainerStyle,
  returnKeyLabel = "search",
  onSubmitEditing,
  autoFocus = false,
}: SearchBarProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.searchContainer, inputContainerStyle]}>
        <Ionicons
          name="search"
          size={24}
          color={Colors.gray2}
          style={styles.icon}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          returnKeyLabel="search"
          style={styles.input}
          placeholderTextColor={Colors.gray2}
          returnKeyType={returnKeyLabel}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onChangeText("")}>
            <Ionicons name="close-circle" size={20} color={Colors.gray2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray5,
    borderRadius: 8,
    borderCurve: "continuous",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontSize: 16,
    marginLeft: 8,
    paddingVertical: 0,
  },
  icon: {
    marginRight: 4,
  },
});
