import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TimeIcon, CheckCircleIcon, CloseIcon } from "@chakra-ui/icons"; 
import CustomModel from "../../components/CustomModel";
import axios from "axios"; 

const fields = [{ name: "files", label: "Upload Image", type: "file" }];
const Base_url = process.env.REACT_APP_BACKEND_URL;

const AppliedCampaigns = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewSrc, setPreviewSrc] = useState("");
  const [formData, setFormData] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  const {onOpen, isOpen, onClose} = useDisclosure();

  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      const res = await axios.get(`${Base_url}/fetch/campaign`);
      setCampaigns(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching campaigns: ", error);
      setError("Failed to load campaigns"); 
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getStatusIcon = (status) => {
    if (status === "Pending") {
      return <TimeIcon color="yellow.500" />;
    } else if (status === "Approved") {
      return <CheckCircleIcon color="green.500" />;
    } else if (status === "Rejected") {
      return <CloseIcon color="red.500" />;
    }
  };

  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file,
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <Box bg={bg} minH="100vh" py={10} px={[4, 8, 16]}>
      <Flex justify="center">
        <Heading fontSize={["2xl", "3xl", "4xl"]} mb={8}>
          Applied Campaigns
        </Heading>
      </Flex>

      <Box w="full" maxW="800px" mx="auto">
        {error && (
          <Text color="red.500" mb={4} fontSize="lg" textAlign="center">
            {error}
          </Text>
        )}

        {loading ? (
          <Text fontSize="lg" textAlign="center">
            Loading campaigns...
          </Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => 
                campaign?.applicants?.map((applicant) => {
                  if (user.name === applicant.name) {
                    return (
                      <Box
                        key={index}
                        bg={cardBg}
                        p={6}
                        borderRadius="md"
                        shadow="md"
                        _hover={{ shadow: "lg" }}
                      >
                        <Flex justify="space-between" align="center" mb={5}>
                          <Box>
                            <Text fontSize="xl" fontWeight="bold">
                              {campaign.title}
                            </Text>
                          </Box>

                          <Flex align="center">
                            {getStatusIcon(applicant.status)}
                            <Text ml={2} fontSize="sm">
                              {applicant.status}
                            </Text>
                          </Flex>
                        </Flex>

                        {applicant.status === "Approved" && (
                          <CustomModel
                            type="upload content"
                            text="Upload Content"
                            fields={fields}
                            formData={formData}
                            setFormData={setFormData}
                            setSelectedImage={setSelectedImage}
                            onOpen={onOpen} 
                            isOpen={isOpen} 
                            onClose={onClose}
                            campaign={campaign}
                          />
                        )}
                      </Box>
                    );
                  }
                  return null; 
                })
              )
            ) : (
              <Text fontSize="lg" textAlign="center">
                No campaigns found.
              </Text>
            )}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default AppliedCampaigns;
