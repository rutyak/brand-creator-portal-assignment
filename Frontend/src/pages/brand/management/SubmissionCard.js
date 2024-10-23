import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Textarea,
  Image,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

const SubmissionCard = ({ name, type, url }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box
      bg={cardBg}
      p={6}
      borderRadius="md"
      shadow="md"
      w="60%"
      maxW="2xl"
      mx="auto"
      my={4}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
    >
      <Heading size="md" mb={4}>
        Submission from {name}
      </Heading>

      <Flex justify="center" align="center" h="300px" mb={4} bg="gray.100">
        {type === "video" ? (
          <Box
            w="full"
            h="full"
            bg="gray.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <video
              controls
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            > 
              <source src="https://res.cloudinary.com/daguvaxyh/video/upload/v1729703088/Videos/vfu3dvtsq0y0clg4vnc7.mp4" type="video/mp4"/>
            </video>
          </Box>
        ) : (
          Array.isArray(url) &&
          url.map((imageSrc, index) => (
            <Image
              key={index}
              src={imageSrc}
              alt={`Submission ${index + 1}`}
              objectFit="cover"
              maxW="30%"
              height="100%"
              m={1}
              borderRadius="md"
            />
          ))
        )}
      </Flex>

      <Textarea
        placeholder="Provide feedback or revision requests here..."
        mb={4}
        focusBorderColor="blue.400"
      />

      <Flex justify="space-between">
        <Button
          colorScheme="blue"
          size={buttonSize}
          flex="1"
          mr={2}
          _hover={{ bg: "blue.600" }}
        >
          Approve
        </Button>
        <Button
          colorScheme="red"
          size={buttonSize}
          flex="1"
          ml={2}
          _hover={{ bg: "red.600" }}
        >
          Reject
        </Button>
      </Flex>
    </Box>
  );
};

export default SubmissionCard;
