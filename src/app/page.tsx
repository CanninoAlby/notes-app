"use client"

import { Heading, Text, VStack, IconButton, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, Center } from "@chakra-ui/react"
import { FaSun, FaMoon } from "react-icons/fa";
import NoteList from "./components/NoteList";
import { useState } from "react";
import { AddNote } from "./components/AddNote";


export default function Page() {
  const [isAddNoteVisible, setIsAddNoteVisible] = useState(false);
  return (
    <VStack p={4}>
        <IconButton icon={<FaSun />} isRound={true} aria-label={""} size='lg' alignSelf='flex-end'></IconButton>
        <Heading pb={8} fontWeight="extrabold" size="2xl" bgGradient="linear(to-l, #7928CA, #FF0080)"bgClip="text">Notes App</Heading>
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