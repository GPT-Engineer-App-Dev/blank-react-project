import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast } from '@chakra-ui/react';
import { useDrinks, useAddDrink, useUpdateDrink, useDeleteDrink } from '../integrations/supabase';

const Drinks = () => {
  const { data: drinks, isLoading, isError } = useDrinks();
  const addDrink = useAddDrink();
  const updateDrink = useUpdateDrink();
  const deleteDrink = useDeleteDrink();
  const toast = useToast();

  const [newDrink, setNewDrink] = useState({ name: '', type: '', price: '' });
  const [editingDrink, setEditingDrink] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDrink({ ...newDrink, [name]: value });
  };

  const handleAddDrink = async () => {
    try {
      await addDrink.mutateAsync(newDrink);
      toast({ title: 'Drink added successfully', status: 'success' });
      setNewDrink({ name: '', type: '', price: '' });
    } catch (error) {
      toast({ title: 'Error adding drink', status: 'error', description: error.message });
    }
  };

  const handleUpdateDrink = async () => {
    try {
      await updateDrink.mutateAsync(editingDrink);
      toast({ title: 'Drink updated successfully', status: 'success' });
      setEditingDrink(null);
    } catch (error) {
      toast({ title: 'Error updating drink', status: 'error', description: error.message });
    }
  };

  const handleDeleteDrink = async (id) => {
    try {
      await deleteDrink.mutateAsync(id);
      toast({ title: 'Drink deleted successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting drink', status: 'error', description: error.message });
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error loading drinks</Box>;

  return (
    <VStack spacing={4} p={4}>
      <Box>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={newDrink.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input name="type" value={newDrink.type} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input name="price" value={newDrink.price} onChange={handleInputChange} />
        </FormControl>
        <Button onClick={handleAddDrink} mt={2}>Add Drink</Button>
      </Box>

      {editingDrink && (
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={editingDrink.name} onChange={(e) => setEditingDrink({ ...editingDrink, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={editingDrink.type} onChange={(e) => setEditingDrink({ ...editingDrink, type: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input name="price" value={editingDrink.price} onChange={(e) => setEditingDrink({ ...editingDrink, price: e.target.value })} />
          </FormControl>
          <Button onClick={handleUpdateDrink} mt={2}>Update Drink</Button>
        </Box>
      )}

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {drinks.map((drink) => (
            <Tr key={drink.id}>
              <Td>{drink.name}</Td>
              <Td>{drink.type}</Td>
              <Td>{drink.price}</Td>
              <Td>
                <Button size="sm" onClick={() => setEditingDrink(drink)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteDrink(drink.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default Drinks;