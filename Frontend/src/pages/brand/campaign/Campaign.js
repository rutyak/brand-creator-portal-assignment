import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import ApplicantCard from "./ApplicantCard";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const Base_url = process.env.REACT_APP_BACKEND_URL;

const Campaign = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const initialCampaign = location?.state?.campaign; 
  const [campaign, setCampaign] = useState(initialCampaign);
  const [applicants, setApplicants] = useState(campaign.applicants);

  const handleStatusChange = async (newApplicants) => {
    try {
      const res = await axios.put(
        `${Base_url}/allupdate/campaign/${campaign._id}`,
        {
          applicants: newApplicants,
        }
      );

      if (res.status === 200) {
        setApplicants(res.data.campaign.applicants);
        toast({
          title: "Status Updated",
          description: "Applicant status successfully updated!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update applicant status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleApprove = (index) => {
    const newApplicants = [...applicants];
    newApplicants[index].status = "Approved";
    setApplicants(newApplicants);

    handleStatusChange(newApplicants);
  };

  const handleReject = (index) => {
    const newApplicants = [...applicants];
    newApplicants[index].status = "Rejected";
    setApplicants(newApplicants);

    handleStatusChange(newApplicants);
  };

  return (
    <Box
      maxW="container.lg"
      mx="auto"
      p={6}
      minH="100vh"
      bgGradient="linear(to-br, teal.300, blue.500)"
      color={useColorModeValue("gray.800", "whiteAlpha.900")}
    >
      <Flex
        justify="space-between"
        align="center"
        mb={10}
      >
        <Heading as="h1" size="lg">
          Campaign
        </Heading>
        <Button colorScheme="teal" shadow="md" onClick={() => navigate("/campaignmanagement", { state: campaign})}>
          Campaign Management
        </Button>
      </Flex>

      <Box
        p={6}
        mb={6}
        bg={useColorModeValue("white", "gray.700")}
        shadow="2xl"
        borderRadius="lg"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.03)" }}
      >
        <Heading as="h2" size="lg" mb={2}>
          {campaign.title}
        </Heading>
        <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
          Showcase our new summer collection in creative and engaging ways.
        </Text>
      </Box>

      <Heading as="h3" size="md" mb={4}>
        Applicants
      </Heading>
      <VStack align="stretch" spacing={4}>
        {applicants.map((applicant, index) => (
          <ApplicantCard
            key={index}
            name={applicant.name}
            status={applicant.status}
            onApprove={() => handleApprove(index)}
            onReject={() => handleReject(index)}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Campaign;
