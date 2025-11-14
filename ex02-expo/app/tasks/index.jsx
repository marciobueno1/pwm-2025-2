import { addTask, getTasks } from "@/api";
import { CardTask } from "@/components/CardTask";
import { useStore } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function TaskList() {
  const { user } = useStore();
  const navigation = useNavigation();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    navigation.setOptions({ title: `Tarefas` });
  }, [navigation]);

  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTasks(user?.sessionToken),
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
    },
    onError: (error) => {
      console.log("error", error);
      console.log("errorMessage", error.message);
      Alert.alert("Something went wrong", error.message);
    },
  });

  if (isFetching) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data) {
    return <Text>No data available</Text>;
  }
  return (
    <View style={{ padding: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TextInput
          placeholder="Add a task"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          title="Add"
          onPress={() =>
            addMutation.mutate({
              description,
              sessionToken: user?.sessionToken,
            })
          }
        />
      </View>
      <View
        style={{
          marginVertical: 5,
          backgroundColor: "grey",
          width: "90%",
          height: 2,
          alignSelf: "center",
        }}
      />
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item: task }) => (
          <CardTask
            key={task.objectId}
            task={task}
            onNavigate={() => router.navigate(`/tasks/${task.objectId}`)}
          />
        )}
      />
      {isPending && <Text>Pending...</Text>}
    </View>
  );
}
