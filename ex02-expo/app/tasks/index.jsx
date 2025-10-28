import { addTask, getTasks } from "@/api";
import { CardTask } from "@/components/CardTask";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function TaskList() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { data, isFetching, error, isPending } = useQuery({
    queryKey: ["todos"],
    queryFn: getTasks,
  });

  const addMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setDescription("");
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
    <View>
      <Text style={{ fonteSize: 24, fontWeight: "bold" }}>Task List</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Add a task"
          value={description}
          onChangeText={setDescription}
        />
        <Button
          title="Add"
          onPress={() => addMutation.mutate({ description })}
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
