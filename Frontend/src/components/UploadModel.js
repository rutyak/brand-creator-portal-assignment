import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Image,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const UploadModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSrc, setPreviewSrc] = useState('');
  const toast = useToast();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected.',
        description: 'Please choose a file before uploading.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: 'File uploaded!',
      description: 'Your content has been uploaded successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose(); 
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="lg">
        Upload Your Content
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload Your Content</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.300')}>
                Choose a file and preview it before uploading
              </Text>

              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                bg="white"
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{ borderColor: 'gray.400' }}
              />

              {previewSrc && (
                <Image
                  src={previewSrc}
                  alt="Preview"
                  borderRadius="md"
                  boxSize="200px"
                  objectFit="cover"
                  shadow="md"
                  mt={3}
                />
              )}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              size="lg"
              w="full"
              onClick={handleUpload}
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.700' }}
            >
              Upload Content
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadModal;
