import { Flex, Input, Button } from "@chakra-ui/react";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { supabase } from "../client";
import useSWRMutation from "swr/mutation";

const addTask = async (_: string, { arg }: { arg: string }) => {
  await supabase.from("tasks").insert([{ title: arg }]);
};

export const AddTaskForm: FC = () => {
  const { trigger, isMutating } = useSWRMutation("/tasks", addTask);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    trigger(input);
    setInput("");
  };

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <Flex gap={4} as="form" onSubmit={handleSubmit}>
      <Input placeholder="Task" value={input} onChange={onChange} />
      <Button
        colorScheme="blue"
        type="submit"
        isLoading={isMutating}
        disabled={isMutating}
      >
        追加する
      </Button>
    </Flex>
  );
};
