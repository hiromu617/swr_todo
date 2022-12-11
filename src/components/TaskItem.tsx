import { Card, CardBody, Text, Checkbox, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { supabase } from "../client";
import { Task } from "../types";

type Props = {
  task: Task;
};

export const TaskItem: FC<Props> = ({ task }) => {
  return (
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
  );
};
