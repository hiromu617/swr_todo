import { Flex, Input, Button, useToast } from "@chakra-ui/react";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { supabase } from "../client";
import useSWRMutation from "swr/mutation";

const addTask = async (_: string, { arg }: { arg: string }) => {
  await supabase.from("tasks").insert([{ title: arg }]);
};

export const AddTaskForm: FC = () => {
  const toast = useToast();
  const { trigger, isMutating } = useSWRMutation("/tasks", addTask, {
    onSuccess: () =>
      toast({
        title: "タスクを追加しました",
        status: "success",
      }),
    onError: () =>
      toast({
        title: "エラーが発生しました",
        status: "error",
      }),
  });
  const [input, setInput] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (input === "") return;
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
