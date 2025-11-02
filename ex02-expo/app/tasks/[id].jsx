"use client";

import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { getTask, deleteTask, updateTask } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskDetails } from "@/components/TaskDetails";
import { useEffect } from "react";

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
