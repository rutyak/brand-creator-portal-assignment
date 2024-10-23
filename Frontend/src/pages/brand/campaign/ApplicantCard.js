import {
  Box,
  Flex,
  Heading,
  Badge,
  Button,
  HStack,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";

const ApplicantCard = ({ name, status, onApprove, onReject }) => {
    let statusColor;
    let statusText;
  
    switch (status) {
      case "Pending":
        statusColor = "yellow";
        statusText = "Pending";
        break;
      case "Approved":
        statusColor = "green";
        statusText = "Approved";
        break;
      case "Rejected":
        statusColor = "red";
        statusText = "Rejected";
        break;
      default:
        statusColor = "gray";
    }
  
    return (
      <Flex
        p={4}
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        bg={useColorModeValue("white", "gray.700")}
        shadow="md"
        borderRadius="lg"
        mb={4}
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <HStack spacing={4}>
          <Avatar name={name} />
          <Box>
            <Heading size="md">{name}</Heading>
            <Badge colorScheme={statusColor}>{statusText}</Badge>
          </Box>
        </HStack>
  
        {status === "Pending" && (
          <HStack spacing={2}>
            <Button
              colorScheme="green"
              size="sm"
              _hover={{ bg: "green.500", color: "white" }}
              onClick={onApprove}
            >
              Approve
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              _hover={{ bg: "red.500", color: "white" }}
              onClick={onReject}
            >
              Reject
            </Button>
          </HStack>
        )}
      </Flex>
    );
  };


export default ApplicantCard;