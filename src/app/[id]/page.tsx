'use client';

import { CircularProgress, Box, Text, VStack, StackDivider, IconButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function NoteDetail({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/notes/${params.id}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error(error));
    }, [params.id]);

    const handleBackButtonClick = () => {
        router.push(`/`);
    };

    return (
        <div>
            {data ? (
                <VStack p={4}>
                    <IconButton icon={<FaArrowLeft />} isRound={true} aria-label={""} size='lg' alignSelf='flex-start' onClick={handleBackButtonClick}></IconButton>
                    <VStack width="100%" p={8} borderRadius="lg" borderColor="gray.100" borderWidth={"2px"} divider={<StackDivider/>} maxW={{base:'90vw', sm:'80vw', lg: '50vw', xl: '40vw'}} align="center">
                        <Text fontSize="xl" fontWeight="bold">{data.title}</Text>
                        <Text alignSelf={'start'}>{data.body}</Text>
                    </VStack> 
                </VStack>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress isIndeterminate color='pink.300' />
                </Box>
            )}
        </div>
    );
}