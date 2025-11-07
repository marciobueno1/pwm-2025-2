import { signingUp } from "@/api";
import { useStore } from "@/zustand";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function SigningUp() {
  const { setUser } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutation({
    mutationFn: signingUp,
    onSuccess: (data) => {
      const mergedUser = {
        ...data,
        username: username.trim(),
        email: email.trim(),
      };
      setUser(mergedUser);
      console.log("data", data);
      router.replace("/");
    },
    onError: (error) => {
      console.log("error", error);
      Alert.alert("Something went wrong", error.message);
    },
  });

  const handleSignUp = () => {
    if (
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      Alert.alert("Passwords do not match");
      return;
    }
    mutation.mutate({
      username: username.trim(),
      password: password.trim(),
      email: email.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
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
      <Text>Confirm Password</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
      />
      <View style={styles.button}>
        <Button title="Sign Up" onPress={() => handleSignUp()} />
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
