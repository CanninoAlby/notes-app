import React, { useEffect, useState } from "react";
import { Box, Stack, Heading, Text, VStack, IconButton, HStack, StackDivider, Center, Button, CircularProgress } from "@chakra-ui/react"
import { useRouter } from 'next/navigation';
import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface Note {
    id: string;
    title: string;
    body: string;
}

export default function NoteList() {
    const [notes, setNotes] = useState<Note[]>([]);
    const router = useRouter();


    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get('/api/notes');
            setNotes(response.data);
        };

        fetchNotes();
    }, []);

    const handleButtonClick = (id: string) => {
        router.push(`/${id}`);
    };

    const handleDelete = async (id: string) => {
        await axios.delete(`/api/notes/${id}`);
        setNotes(notes.filter(note => note.id !== id));
        window.location.reload();
    };
    

    return (
        <VStack width="100%" my={4} borderRadius="lg" borderColor="gray.100" borderWidth={"2px"} divider={<StackDivider/>} maxW={{base:'90vw', sm:'80vw', lg: '50vw', xl: '40vw'}} align={'stretch'}>
            {notes.map((note) => (
                <HStack key={note.title} width={"100%"} justifyContent={'space-between'}>
                    <Button onClick={() => handleButtonClick(note.id)} my={4} backgroundColor={"white"} _hover={{bg:"white"}} width={'50%'} justifyContent="flex-start">
                        <Text fontSize={'xl'}>{note.title}</Text>
                    </Button>
                    <IconButton icon={<FaTrash />} isRound={true} aria-label={""} size='lg' m={4}></IconButton>
                </HStack>
            ))}
        </VStack>
    );
}