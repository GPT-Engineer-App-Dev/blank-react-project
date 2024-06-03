import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Table, Tbody, Td, Th, Thead, Tr, VStack, useToast } from '@chakra-ui/react';
import { useDishes, useAddDish, useUpdateDish, useDeleteDish } from '../integrations/supabase';

const Dishes = () => {
  const { data: dishes, isLoading, isError } = useDishes();
  const addDish = useAddDish();
  const updateDish = useUpdateDish();
  const deleteDish = useDeleteDish();
  const toast = useToast();

  const [newDish, setNewDish] = useState({ name: '', country: '', size: '', type: '', price: '' });
  const [editingDish, setEditingDish] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({ ...newDish, [name]: value });
  };

  const handleAddDish = async () => {
    try {
      await addDish.mutateAsync(newDish);
      toast({ title: 'Dish added successfully', status: 'success' });
      setNewDish({ name: '', country: '', size: '', type: '', price: '' });
    } catch (error) {
      toast({ title: 'Error adding dish', status: 'error', description: error.message });
    }
  };

  const handleUpdateDish = async () => {
    try {
      await updateDish.mutateAsync(editingDish);
      toast({ title: 'Dish updated successfully', status: 'success' });
      setEditingDish(null);
    } catch (error) {
      toast({ title: 'Error updating dish', status: 'error', description: error.message });
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      await deleteDish.mutateAsync(id);
      toast({ title: 'Dish deleted successfully', status: 'success' });
    } catch (error) {
      toast({ title: 'Error deleting dish', status: 'error', description: error.message });
    }
  };

  if (isLoading) return <Box>Loading...</Box>;
  if (isError) return <Box>Error loading dishes</Box>;

  return (
    <VStack spacing={4} p={4}>
      <Box>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={newDish.name} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input name="country" value={newDish.country} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Size</FormLabel>
          <Input name="size" value={newDish.size} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input name="type" value={newDish.type} onChange={handleInputChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input name="price" value={newDish.price} onChange={handleInputChange} />
        </FormControl>
        <Button onClick={handleAddDish} mt={2}>Add Dish</Button>
      </Box>

      {editingDish && (
        <Box>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={editingDish.name} onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Input name="country" value={editingDish.country} onChange={(e) => setEditingDish({ ...editingDish, country: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Size</FormLabel>
            <Input name="size" value={editingDish.size} onChange={(e) => setEditingDish({ ...editingDish, size: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Input name="type" value={editingDish.type} onChange={(e) => setEditingDish({ ...editingDish, type: e.target.value })} />
          </FormControl>
          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input name="price" value={editingDish.price} onChange={(e) => setEditingDish({ ...editingDish, price: e.target.value })} />
          </FormControl>
          <Button onClick={handleUpdateDish} mt={2}>Update Dish</Button>
        </Box>
      )}

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Country</Th>
            <Th>Size</Th>
            <Th>Type</Th>
            <Th>Price</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dishes.map((dish) => (
            <Tr key={dish.id}>
              <Td>{dish.name}</Td>
              <Td>{dish.country}</Td>
              <Td>{dish.size}</Td>
              <Td>{dish.type}</Td>
              <Td>{dish.price}</Td>
              <Td>
                <Button size="sm" onClick={() => setEditingDish(dish)}>Edit</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeleteDish(dish.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
  );
};

export default Dishes;