import { loggingIn } from "@/api";
import { useStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoggingIn() {
  const { setUser } = useStore();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: loggingIn,
    onSuccess: (data) => {
      setUser(data);
      console.log("data", data);
      router.replace("/");
    },
    onError: (error) => {
      console.log("error", error);
      Alert.alert("Something went wrong", error.message);
    },
  });

  const handleLogIn = () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Please fill in all fields");
      return;
    }
    mutation.mutate({
      username: username.trim(),
      password: password.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <View style={styles.button}>
        <Button title="Log In" onPress={() => handleLogIn()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 10,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "90%",
    borderColor: "black",
    alignSelf: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
});
