import { Flex, Input, Button } from "@chakra-ui/react";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { supabase } from "../client";
import { useSWRConfig } from "swr";

const addTask = async (title: string) => {
  await supabase.from("tasks").insert([{ title }]);
};

export const AddTaskForm: FC = () => {
  const { mutate } = useSWRConfig();
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addTask(input);
    setIsSubmitting(false);
    setInput("");
    mutate("/tasks");
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
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        追加する
      </Button>
    </Flex>
  );
};
