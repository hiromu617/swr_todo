import {
  Container,
  Center,
  Heading,

} from "@chakra-ui/react";
import { TaskList } from "./components/TaskList";
import { AddTaskForm } from "./components/AddTaskForm";

function App() {
  return (
    <Center>
      <Container maxW="xl" mt={10}>
        <Heading mb={4}>Todo List</Heading>
        <AddTaskForm />
        <TaskList />
      </Container>
    </Center>
  );
}

export default App;
