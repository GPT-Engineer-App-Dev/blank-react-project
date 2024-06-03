import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Dishes App</Text>
        <Text>Manage your dishes efficiently.</Text>
        <Button as={Link} to="/dishes" colorScheme="teal">Go to Dishes</Button>
      </VStack>
    </Container>
  );
};

export default Index;