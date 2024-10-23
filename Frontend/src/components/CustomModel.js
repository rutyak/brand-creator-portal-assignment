import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Image,
  useToast,
  VStack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const CustomModel = ({
  type,
  text,
  fields,
  formData,
  setFormData,
  handleSubmit,
  setSelectedImage,
  isOpen,
  onOpen,
  onClose,
  campaign,
}) => {
  const [previewSrc, setPreviewSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const toast = useToast();

  const borderColor = useColorModeValue("gray.300", "gray.600");
  const hoverBorderColor = useColorModeValue("gray.400", "gray.500");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const isImage = files.every((file) => file.type.startsWith("image"));
    const isVideo = files.some((file) => file.type.startsWith("video"));

    if (isImage) {
      if (files.length > 3) {
        toast({
          title: "You can upload a maximum of 3 images.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const newPreview = files.map((file) => URL.createObjectURL(file));
      setPreviewSrc(newPreview);
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: files,
      }));
      setVideoPreview(null); 
    } else if (isVideo) {
      if (files.length > 1) {
        toast({
          title: "You can only upload 1 video at a time.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const videoFile = files[0];
      const videoUrl = URL.createObjectURL(videoFile);
      setVideoPreview(videoUrl);
      setPreviewSrc([]);
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: videoFile, 
      }));
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  async function handleFileSubmit() {
    try {
      const content = new FormData();
      content.append("name", user.name);

      if (videoPreview) {
        content.append("files", formData.files);
      } else {
        formData.files.forEach((file) => {
          content.append("files", file);
        });
      }

      const res = await axios.patch(
        `${Base_url}/update/campaign/content/${
          videoPreview ? "single" : "multi"
        }/${campaign._id}`,
        content
      );

      if (res.status === 200) {
        toast({
          title: "File uploaded successfully",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Unable to upload",
        status: "error",
        duration: 3000,
      });
    }
  }

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen} shadow="md">
        {text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent w="90%" maxW="lg" p={3}>
          <ModalHeader>{text}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={5}>
              {fields.map((field, index) => (
                <FormControl mb={1} key={index}>
                  <FormLabel>{field.label}</FormLabel>
                  {field.type === "textarea" ? (
                    <Textarea
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                    />
                  ) : field.type === "file" ? (
                    <>
                      <Input
                        type="file"
                        name={field.name}
                        accept="image/*, video/*"
                        multiple
                        onChange={handleFileChange}
                        bg="white"
                        borderColor={borderColor}
                        _hover={{ borderColor: hoverBorderColor }}
                      />
                      {previewSrc.length > 0 && (
                        <Grid
                          templateColumns="repeat(auto-fit, minmax(150px, 1fr))"
                          gap={4}
                          mt={3}
                        >
                          {previewSrc.map((src, idx) => (
                            <Image
                              key={idx}
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              borderRadius="md"
                              boxSize="150px"
                              maxH="400px"
                              objectFit="cover"
                              shadow="md"
                            />
                          ))}
                        </Grid>
                      )}
                      {videoPreview && (
                        <video
                          src={videoPreview}
                          height="300px"
                          controls
                          style={{ width: "100%", maxHeight:"400px", marginTop: "10px" }}
                        />
                      )}
                    </>
                  ) : (
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                    />
                  )}
                </FormControl>
              ))}
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            {type === "create" ? (
              <Button colorScheme="teal" onClick={handleSubmit} shadow="md">
                Create Campaign
              </Button>
            ) : (
              <Button colorScheme="teal" onClick={handleFileSubmit} shadow="md">
                Upload Content
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModel;
