import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, IconButton, Input, VStack } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";

interface AddNoteProps {
    onClose: () => void;
  }

export const AddNote= () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the submission of the form, for example, call an API to save the note
    console.log({ title, body });
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