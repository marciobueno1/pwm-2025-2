import { View, Text, Pressable, StyleSheet } from "react-native";

export function CardTask({ task, onNavigate }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: task.done ? "green" : "red" },
      ]}
    >
      <Pressable onPress={onNavigate}>
        <Text>{task.description}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginBottom: 10,
    justifyContent: "center",
  },
});
