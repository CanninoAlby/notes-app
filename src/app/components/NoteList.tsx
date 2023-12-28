import React from "react";
import { Box, Stack, Heading, Text, VStack, IconButton, HStack, StackDivider, Center } from "@chakra-ui/react"
import { FaTrash } from "react-icons/fa";

export default function NoteList() {
    const notes = [
        {
            id : 1,
            title  :    "Note 1",
            body   :    "Body 1",
            createdAt : "2021-09-01 00:00:00"
        },
        {
            id : 2,
            title  :    "Note 2",
            body   :    "Body 2",
            createdAt : "2021-09-01 00:00:00"
        },
        {
            id : 3,
            title  :    "Note 3",
            body   :    "Body 3",
            createdAt : "2021-09-01 00:00:00"
        },
    ]
    return (
    <VStack width="100%" my={4} borderRadius="lg" borderColor="gray.100" borderWidth={"2px"} divider={<StackDivider/>} maxW={{base:'90vw', sm:'80vw', lg: '50vw', xl: '40vw'}} align={"center"} alignItems={'stretch'}>
        { notes.map((notes) => (
            <HStack key={notes.id} p={4} my={1} justifyContent={'space-between'}>
                <Stack>
                    <Heading size="md">{notes.title}</Heading>
                    <Text>{notes.body}</Text>
                </Stack>
                <IconButton icon={<FaTrash/>} isRound={true} aria-label=""></IconButton>
            </HStack>
        ))
        }
    </VStack>
    )
}