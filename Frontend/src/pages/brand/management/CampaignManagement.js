import {
  Box,
  Heading,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import SubmissionCard from "./SubmissionCard";
import { useLocation } from "react-router-dom";

const CampaignManagement = () => {

  const location = useLocation();
  const campaign = location.state;
  
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.800")}
      py={10}
      px={4}
    >
      <Heading
        as="h1"
        textAlign="center"
        mb={10}
        fontSize={{ base: "2xl", md: "4xl" }}
        color={useColorModeValue("gray.700", "whiteAlpha.900")}
      >
        Campaign Management
      </Heading>

      <VStack spacing={6}>
        {campaign.contents.map((submission, index) => (
          <SubmissionCard
            key={index}
            name={submission.name}
            type={submission.type}
            url={submission.files}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default CampaignManagement;
