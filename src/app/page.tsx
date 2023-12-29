"use client"

import { Heading, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton} from "@chakra-ui/react"
import NoteList from "./components/NoteList";
import { useState } from "react";
import { AddNote } from "./components/AddNote";

export default function Page() {
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  return (
    <VStack p={16}>
      <Heading pb={8} fontWeight="extrabold" size="2xl" bgGradient="linear(to-l, #7928CA, #FF0080)" bgClip="text">Notes App</Heading>
      <NoteList />
      <Button colorScheme="pink" onClick={() => setIsAddNoteVisible(true)}>Add Note</Button>
      <Modal isOpen={isAddNoteVisible} onClose={() => setIsAddNoteVisible(false)}>
        <ModalOverlay />
        <ModalContent mx="auto" my="auto">
          <ModalCloseButton />
          <AddNote />
        </ModalContent>
      </Modal>
    </VStack>
  )
}