import { Stack, Spinner, Center } from "@chakra-ui/react";
import { FC } from "react";
import { supabase } from "../client";
import { Task } from "../types";
import useSWR from "swr";
import { TaskItem } from "./TaskItem";

const fetcher = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select(`*`)
    .order("created_at", { ascending: false });
  if (error) throw error;
  if (data) return data;
  return [];
};

export const TaskList: FC = () => {
  const {
    data: tasks,
    isLoading,
    isValidating,
  } = useSWR<Task[]>("/tasks", fetcher, {
    keepPreviousData: true,
  });

  if ((isLoading && !isValidating) || !tasks)
    return (
      <Center my={10}>
        <Spinner size="lg" />
      </Center>
    );

  return (
    <Stack my={4} gap={4}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </Stack>
  );
};
