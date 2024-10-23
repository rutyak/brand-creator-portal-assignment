import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const ApplyCampaign = ({ campaign }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [introduction, setIntroduction] = useState("");
  const toast = useToast();
  const buttonHover = useColorModeValue("blue.600", "blue.300");
  const modalBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleApplyCampaign = async () => {
    if (!campaign) {
      toast({
        title: "Campaign not found",
        description: "Please select a valid campaign",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast({
          title: "User not logged in",
          description: "Please log in to apply for the campaign.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const applicant = {
        name: user.name,
        introduction,
        status: "Pending",
      };

      const res = await axios.patch(
        `${BASE_URL}/update/campaign/${campaign._id}`,
        { applicant }
      );

      if (res.status === 200) {
        toast({
          title: "Application Submitted",
          description: "Your application was successfully submitted!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }

      onClose();
    } catch (error) {
      console.error("Error applying for campaign:", error);

      toast({
        title: "Submission Failed",
        description:
          error.response?.data?.message ||
          "Something went wrong, please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="blue"
        width={[200, 240]}
        size="lg"
        mt={[4, 0]}
        color="white"
        shadow="md"
        _hover={{ bg: buttonHover }}
        borderRadius="full"
      >
        Apply Now
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="3xl" isCentered>
        <ModalOverlay />
        <ModalContent bg={modalBg} borderRadius="xl" p={8} shadow="2xl">
          <ModalCloseButton />
          <Flex flexDirection="column" mb={5} gap={2}>
            <ModalHeader fontSize="3xl" fontWeight="bold">
              {campaign?.title || "Campaign Details"}
            </ModalHeader>
            <Text
              fontSize="md"
              color={textColor}
              display="flex"
              alignItems="center"
              ml={7}
            >
              <CalendarIcon mr={2} />
              Deadline:{" "}
              {campaign?.deadline
                ? new Date(campaign.deadline).toLocaleDateString()
                : "N/A"}
            </Text>
          </Flex>

          <ModalBody mb={16}>
            <Text fontSize="lg" mb={6} color={textColor}>
              We are looking for creative individuals to showcase our new summer
              collection in unique and engaging ways.
            </Text>

            <Box
              mb={6}
              p={4}
              borderRadius="md"
              border={`1px solid ${borderColor}`}
            >
              <Text mb={2} fontWeight="bold" fontSize="lg">
                Requirements:
              </Text>
              <Text>
                Create 3-5 photos or a 30-second video featuring our products in
                outdoor summer settings.
              </Text>
            </Box>

            <VStack spacing={5} align="start">
              <Textarea
                placeholder="Tell us why you're a great fit for this campaign..."
                size="lg"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                focusBorderColor="blue.400"
                bg={useColorModeValue("gray.50", "gray.700")}
                borderRadius="md"
                shadow="sm"
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              bg="blue.900"
              color="white"
              size="lg"
              borderRadius="full"
              _hover={{ bg: "teal.400" }}
              shadow="md"
              onClick={handleApplyCampaign}
            >
              Apply for Campaign
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApplyCampaign;
