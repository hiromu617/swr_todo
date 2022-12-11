import {
  Container,
  Center,
  Heading,
  Stack,
  Card,
  CardBody,
  Text,
  Checkbox,
  IconButton,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function App() {
  return (
    <Center>
      <Container maxW="xl" mt={10}>
        <Heading mb={4}>Todo List</Heading>
        <Flex gap={4}>
          <Input placeholder="Task" />
          <Button colorScheme="blue">追加する</Button>
        </Flex>
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
      </Container>
    </Center>
  );
}

export default App;
