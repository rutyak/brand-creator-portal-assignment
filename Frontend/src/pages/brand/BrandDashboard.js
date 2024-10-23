import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  useColorMode,
  useColorModeValue,
  Divider,
  useToast,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import CustomModel from "../../components/CustomModel";
import { useNavigate } from "react-router-dom";
import ProfileDrawer from "../../components/ProfileDrawer";
import axios from "axios";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const BrandDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
  }); 
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.800");
  const tableBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); 

  const fields = [
    { name: "title", label: "Campaign Title", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "deadline", label: "Deadline", type: "date" },
  ];

  const getData = async () => {
    try {
      const res = await axios.get(`${Base_url}/fetch/campaign`);
      setCampaigns(res.data);

      toast({
        title: "Data Fetched Successfully!",
        description: "Campaigns have been loaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error fetching campaigns:", error);

      toast({
        title: "Error Fetching Data",
        description: error.message || "Unable to load campaigns.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${Base_url}/create/campaign`, formData);

      toast({
        title: "Form Submitted!",
        description: "Your campaign has been created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setFormData({ title: "", description: "", deadline: "" });
      onClose(); 
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box bg={bg} minH="100vh" py={5} px={[4, 8, 16]}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size="xl" color={headingColor}>
          Brand Dashboard
        </Heading>

        <Flex alignItems="center" gap={4}>
          <CustomModel
            type="create"
            text="Create New Campaign"
            fields={fields}
            submitText="Create Campaign"
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            isOpen={isOpen} 
            onOpen={onOpen} 
            onClose={onClose} 
          />
          <IconButton
            icon={useColorModeValue(
              <MoonIcon boxSize={5} />,
              <SunIcon boxSize={5} />
            )}
            onClick={toggleColorMode}
            aria-label="Toggle theme"
            variant="ghost"
            size="lg"
          />
          <ProfileDrawer />
        </Flex>
      </Flex>

      <Divider my={4} />

      <Box
        maxW="1000px"
        mx="auto"
        bg={tableBg}
        shadow="lg"
        rounded="md"
        p={5}
        overflowX="auto"
      >
        <Heading as="h2" size="lg" mb={4}>
          Your Campaigns
        </Heading>

        {campaigns.length > 0 ? (
          <Table variant="striped" colorScheme="gray" size="lg">
            <Thead>
              <Tr>
                <Th>Campaign Title</Th>
                <Th>Status</Th>
                <Th>Applications</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {campaigns.map((campaign, index) => (
                <Tr
                  key={index}
                  _hover={{ bg: "green.200", cursor: "pointer" }}
                  onClick={() => navigate("/campaign", { state: { campaign } })}
                >
                  <Td fontWeight="semibold">{campaign.title}</Td>
                  <Td>
                    <Badge colorScheme="tail" px={3} py={1}>
                      Active
                    </Badge>
                  </Td>
                  <Td>{campaign?.applicants?.length}</Td>
                  <Td>
                    <Button size="sm" colorScheme="blue">
                      Manage
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text textAlign="center" fontSize="lg" color="gray.500">
            No campaigns available.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default BrandDashboard;
