import React, { useEffect, useState } from "react";
import { Box, Stack, Heading, Text, VStack, IconButton, HStack, StackDivider, Center, Button, CircularProgress, Badge, Spacer } from "@chakra-ui/react"
import { useRouter } from 'next/navigation';
import axios from "axios";
import { FaTrash } from "react-icons/fa";

interface Note {
    id: string;
    title: string;
    body: string;
    createdAt: string;
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
    };
    

    if(notes.length === 0) {
        return(
            <Badge alignSelf={'center'} p={4} m={8} borderRadius={"lg"}>
            You Have No notes yet
            </Badge>
        )
    }

    return (
        <VStack width="100%" my={4} borderRadius="lg" borderColor="gray.100" borderWidth={"2px"} divider={<StackDivider/>} maxW={{base:'90vw', sm:'80vw', lg: '50vw', xl: '40vw'}} align={'stretch'}>
            {notes.map((note) => (
                <HStack key={note.title} width={"100%"} justifyContent={'space-between'} >
                    <Button onClick={() => handleButtonClick(note.id)} my={4} backgroundColor={"white"} _hover={{bg:"white"}} width={'80%'} justifyContent="flex-start" flexDirection={'column'} alignItems={'start'} minH={"70px"}>
                        <Text fontSize={'xl'} fontWeight={'bold'}>{note.title}</Text>
                        <Text fontSize={'sm'} fontWeight={'light'} noOfLines={3}>{note.body.substring(0, 50)+'...'}</Text>
                        <Spacer/>
                        <Text fontSize={'xs'} fontWeight={'thin'} noOfLines={3} mt={2}>{note.createdAt.substring(0, 10)}</Text>
                    </Button>
                    <IconButton icon={<FaTrash />} isRound={true} aria-label={""} size='lg' m={4} onClick={() => handleDelete(note.id)}></IconButton>
                </HStack>
            ))}
            
        </VStack>
    );
}