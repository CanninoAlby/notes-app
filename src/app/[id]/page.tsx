'use client';

import { CircularProgress, Box, VStack, StackDivider, IconButton, FormControl,Button, Editable, EditablePreview, EditableTextarea, useEditableControls, ButtonGroup, Tooltip, useColorModeValue, EditableInput, Input } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { SyntheticEvent, useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NoteDetail({ params }: { params: { id: string } }) {
    const [data, setData] = useState<any>(null);
    const [title, setTitle] = useState(data ? data.title : '');
    const [body, setBody] = useState(data ? data.body : '');
    const router = useRouter();

    const ApiCallFunction = async () => {
        const response = await axios.get(`/api/notes/${params.id}`);
        setData(response.data);
        return response.data;
    }

    useEffect(() => {
        const fetchData = async () => {
          const data = await ApiCallFunction();
          setTitle(data.title);
          setBody(data.body);
        };
      
        fetchData();
    }, []);


    const handleBackButtonClick = () => {
        router.push(`/`);
    };

    function EditableControls() {
        const {
          isEditing,
          getSubmitButtonProps,
          getCancelButtonProps,
          getEditButtonProps
        } = useEditableControls();
    
        return isEditing ? (
          <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
            <IconButton icon={<CheckIcon />} aria-label="Submit" {...getSubmitButtonProps()} />
            <IconButton
                icon={<CloseIcon boxSize={3} />}
                aria-label="Close"
                {...getCancelButtonProps()}
            />
          </ButtonGroup>
        ) : null;
    }


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        // Here you can handle the submission of the form, for example, call an API to save the note
        try {
            const response = await axios.patch(`/api/notes/${data.id}`, { title, body });
            console.log(response.data);
            router.refresh();   
            window.location.reload();
        } catch (error) {
            console.error('Failed to add note');
        }
    }

    return (
        <div>
            {data ? (
                <VStack p={4} as='form' onSubmit={handleSubmit}>
                    <IconButton icon={<FaArrowLeft />} isRound={true} aria-label={""} size='lg' alignSelf='flex-start' onClick={handleBackButtonClick}></IconButton>
                    <VStack width="100%" p={8} borderRadius="lg" borderColor="gray.100" borderWidth={"2px"} divider={<StackDivider/>} maxW={{base:'90vw', sm:'80vw', lg: '50vw', xl: '40vw'}} align="center">
                        <FormControl alignContent={'center'} justifyContent={'center'}>
                        <Editable
                            defaultValue = {data.title}
                            isPreviewFocusable={true}
                            selectAllOnFocus={false}
                            textAlign={'center'}
                            fontSize={'xl'}
                            fontWeight="bold" 
                        >
                            <Tooltip label="Click to edit" shouldWrapChildren={true}>
                            <EditablePreview
                                py={2}
                                px={4}
                                _hover={{
                                background: useColorModeValue("gray.100", "gray.700")
                                }}
                            />
                            </Tooltip>
                            <Input type='text' py={2} px={4} as={EditableInput} onChange={(e) => setTitle(e.target.value)}/>
                            <EditableControls />
                        </Editable>
                        </FormControl>
                        <FormControl alignContent={'center'} justifyContent={'center'}>
                            <Editable
                            defaultValue={data.body} 
                            isPreviewFocusable={true}
                            selectAllOnFocus={false}
                            minHeight={"400px"}
                            >
                                <Tooltip label="Click to edit" shouldWrapChildren={true}>
                                <EditablePreview
                                    py={2}
                                    px={4}
                                    _hover={{
                                    background: useColorModeValue("gray.100", "gray.700")
                                    }}
                                />
                                </Tooltip>
                                <Input type='text' py={2} px={4} as={EditableTextarea} minHeight={"400px"} onChange={(e) => setBody(e.target.value)}/>
                                <EditableControls />
                            </Editable>
                        </FormControl>
                    </VStack> 
                    <Button type="submit" colorScheme="pink" margin={2} alignSelf={'center'}>Save Note</Button>
                </VStack>
            ) : (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress isIndeterminate color='pink.300' />
                </Box>
            )}
        </div>
    );
}