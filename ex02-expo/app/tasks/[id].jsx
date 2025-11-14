"use client";

import { deleteTask, getTask, updateTask } from "@/api";
import { TaskDetails } from "@/components/TaskDetails";
import { useStore } from "@/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function Task() {
  const { user } = useStore();
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
    queryFn: () => getTask({ objectId: id, sessionToken: user?.sessionToken }),
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

  const handleOnDelete = () => {
    deleteMutation.mutate({ ...task, sessionToken: user?.sessionToken });
  };

  const updateMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      console.log("success updated task");
      queryClient.invalidateQueries({ queryKey: [`todos/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log("error updated task", error);
    },
  });

  const handleOnCheck = () => {
    console.log("task", task);
    console.log("handleOnCheck sessionToken", user?.sessionToken);
    updateMutation.mutate({ ...task, sessionToken: user?.sessionToken });
  };

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
          onDelete={handleOnDelete}
          onCheck={handleOnCheck}
          onNavigate={() => router.navigate(`/tasks/${task.objectId}`)}
        />
      )}
      <Button title="Back" onPress={() => router.back()} />
    </View>
  );
}
