import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { SyntheticEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export const AddNote= () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // Here you can handle the submission of the form, for example, call an API to save the note
    try {
      const response = await axios.post('/api/notes', { title, body });
      console.log(response.data);
      // Clear the form
      setTitle('');
      setBody('');
      router.refresh();
      window.location.reload();
      setIsAddNoteVisible(false);
    } catch (error) {
      console.error('Failed to add note');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={12} borderWidth={1} borderRadius="md">
        <VStack spacing={4}>
        <FormControl id="note-title">
            <FormLabel>Note Title</FormLabel>
            <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="note-body">
            <FormLabel>Note Body</FormLabel>
            <Input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="pink">Add Note</Button>
        </VStack>
    </Box>
  );
};