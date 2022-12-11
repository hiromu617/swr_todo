import {
  Container,
  Center,
  Heading,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <Center>
      <Container maxW="xl" mt={10}>
        <Heading mb={4}>Todo List</Heading>
        <Flex gap={4}>
          <Input placeholder="Task" />
          <Button colorScheme="blue">追加する</Button>
        </Flex>
        <TaskList />
      </Container>
    </Center>
  );
}

export default App;
