import {
  Stack,
  Card,
  CardBody,
  Text,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { supabase } from "../client";

export const TaskList: FC = () => {
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const { data, error, status } = await supabase
      .from("tasks")
      .select(`*`);
    console.log(data)
  };
  return (
    <Stack my={4} gap={4}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Card key={i}>
          <CardBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Checkbox size="lg" />
            <Text flex="1">
              View a summary of all your customers over the last month.
            </Text>
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
