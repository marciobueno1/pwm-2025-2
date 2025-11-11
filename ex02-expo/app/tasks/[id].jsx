"use client";

import { deleteTask, getTask, updateTask } from "@/api";
import { TaskDetails } from "@/components/TaskDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Task() {
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const {
    data: task,
    isFetching,
    error,
    isPending,
  } = useQuery({
    queryKey: [`todos/${id}`],
    queryFn: () => getTask(id),
  });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      router.navigate("/tasks");
    },
    onError: (error) => {
      console.log("error", error);
      Alert.alert("Something went wrong", error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`todos/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  useEffect(() => {
    navigation.setOptions({ title: `Tarefa: ${id}` });
  }, [navigation, id]);

  return (
    <View>
      {isFetching && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
      {isPending && <ActivityIndicator />}
      {task && (
        <TaskDetails
          task={task}
          onDelete={deleteMutation.mutate}
          onCheck={updateMutation.mutate}
          onNavigate={() => router.navigate(`/tasks/${task.objectId}`)}
        />
      )}
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
