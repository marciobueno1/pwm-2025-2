import { useStore } from "@/zustand";
import { Text, View } from "react-native";

export default function Counter() {
  const { count } = useStore();
  return (
    <View>
      <Text>Counter: {count}</Text>
    </View>
  );
}
