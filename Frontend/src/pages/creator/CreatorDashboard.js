import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  Heading,
  Stack,
  IconButton,
  useColorMode,
  Divider,
} from "@chakra-ui/react";
import ApplyCampaign from "./ApplyCampaign";
import { useNavigate } from "react-router-dom";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import ProfileDrawer from "../../components/ProfileDrawer";
import axios from "axios";

const Base_url = process.env.REACT_APP_BACKEND_URL;

function CreatorDashboard() {
  const [campaigns, setCampaigns] = useState([]);
  const bg = useColorModeValue("gray.100", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const buttonBg = useColorModeValue("blue.500", "blue.300");
  const buttonHover = useColorModeValue("blue.400", "blue.200");

  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  async function getData() {
    const res = await axios(`${Base_url}/fetch/campaign`);
    setCampaigns(res.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box bg={bg} minH="100vh" py={[5, 6, 8]} px={[4, 8, 16]}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading as="h1" size={["lg", "xl", "2xl"]} color={headingColor}>
          Creator Dashboard
        </Heading>
        <Flex alignItems="center" gap={4}>
          <Button
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHover }}
            shadow="md"
            onClick={() => navigate("/appliedcampaign")}
            size={["sm", "md"]}
          >
            Applied Campaigns
          </Button>
          <IconButton
            icon={useColorModeValue(<MoonIcon boxSize={5} />, <SunIcon boxSize={5} />)}
            onClick={toggleColorMode}
            aria-label="Toggle theme"
            variant="ghost"
            size="lg"
          />
          <ProfileDrawer />
        </Flex>
      </Flex>

      <Divider my={4} />
      <Box w="full" maxW="900px" mx="auto">
        <Heading fontSize={["xl", "2xl", "3xl"]} mb={6} textAlign="center" color={headingColor}>
          Available Campaigns
        </Heading>
        {campaigns.map((campaign, index) => (
          <Box
            key={index}
            bg={cardBg}
            p={4} 
            mb={4}
            borderRadius="lg"
            shadow="lg"
            _hover={{ transform: "scale(1.02)", transition: "all 0.3s" }}
            width="100%"
          >
            <Stack spacing={4}>
              <Text fontSize={["sm", "md", "xl"]} fontWeight="semibold" color={headingColor}>
                {campaign.title}
              </Text>
              <Text fontSize={["sm", "md"]}>{campaign.description}</Text>
              <Flex align="center" mt={2}>
                <Text fontSize={["sm", "md"]} color="gray.500" mr={2}>
                  📅 Deadline:
                </Text>
                <Text fontSize={["sm", "md"]} color="gray.500">
                  {campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : "N/A"}
                </Text>
              </Flex>
              <Divider mt={2} />
              <ApplyCampaign campaign={campaign} />
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CreatorDashboard;
