import { Container, Text, VStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Welcome to the Dishes and Drinks App</Text>
        <Text>Manage your dishes and drinks efficiently.</Text>
        <Button as={Link} to="/dishes" colorScheme="teal">Go to Dishes</Button>
        <Button as={Link} to="/drinks" colorScheme="teal">Go to Drinks</Button>
      </VStack>
    </Container>
  );
};

export default Index;