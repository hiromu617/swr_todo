import { Card, CardBody, Text, Checkbox, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { supabase } from "../client";
import { useSWRConfig } from "swr";
import { Task } from "../types";

type Props = {
  task: Task;
};

const deleteTask = async (id: number) => {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

const updateTask = async (id: number, done: boolean) => {
  const { error } = await supabase.from("tasks").update({ done }).eq("id", id);
  if (error) {
    throw error;
  }
};

export const TaskItem: FC<Props> = ({ task }) => {
  const { mutate } = useSWRConfig();
  const handleDeleteTask = async () => {
    await mutate("/tasks", deleteTask(task.id), {
      optimisticData: (tasks: Task[]) => tasks.filter((t) => t.id !== task.id),
      revalidate: true,
    });
  };

  const handleTaskUpdate = async () => {
    await mutate("/tasks", updateTask(task.id, !task.done), {
      optimisticData: (tasks: Task[]) =>
        tasks.map((t) => {
          if (t.id === task.id) return { ...t, done: !t.done };
          return t;
        }),
      revalidate: true,
    });
  };

  return (
    <Card key={task.id}>
      <CardBody
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
      >
        <Checkbox size="lg" isChecked={task.done} onChange={handleTaskUpdate} />
        <Text flex="1">{task.title}</Text>
        <IconButton
          aria-label="Delete Task"
          size="sm"
          colorScheme="red"
          icon={<CloseIcon />}
          onClick={handleDeleteTask}
        />
      </CardBody>
    </Card>
  );
};
