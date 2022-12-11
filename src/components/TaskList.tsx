import {
  Stack,
  Card,
  CardBody,
  Text,
  Checkbox,
  IconButton,
  Spinner,
  Center
} from "@chakra-ui/react";
import { FC } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { supabase } from "../client";
import { Task } from "../types";
import useSWR from "swr";

const fetcher = async (): Promise<Task[]> => {
  const { data, error } = await supabase.from("tasks").select(`*`);
  if (error) throw error;
  if (data) return data;
  return [];
};

export const TaskList: FC = () => {
  const { data: tasks, isLoading } = useSWR<Task[]>("/tasks", fetcher);

  if (isLoading || !tasks)
    return (
      <Center my={10}>
        <Spinner size="lg" />
      </Center>
    );

  return (
    <Stack my={4} gap={4}>
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Checkbox size="lg" />
            <Text flex="1">{task.title}</Text>
            <IconButton
              aria-label="Delete Task"
              size="sm"
              colorScheme="red"
              icon={<CloseIcon />}
            />
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
};
