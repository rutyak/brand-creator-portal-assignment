import { Outlet } from "react-router-dom";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

const Welcome = () => {
  const inputStyle = {
    width: "100%",
    height:"50px",
    padding: "20px", 
    border: "1px solid #D1D5DB", 
    borderRadius: "8px", 
    marginBottom: "15px", 
    boxShadow: "sm", 
    transition: "all 0.3s",
    _focus: {
      ring: 4,
      ringColor: "purple.500",
    },
  };

  return (
    <Box 
      width="100%" 
      height="100vh" 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      bgGradient="linear(to-r, blue.500, purple.200)"
    >
      <Flex 
        width={["35%", "40%", "45%"]} 
        height={["95%", "92%"]} 
        justifyContent="center" 
        gap={[6, 12, 28]} 
        bg="white" 
        boxShadow="2xl" 
        borderRadius="xl" 
        p={3} 
        borderColor="purple.300" 
        borderWidth="1px"
      >
        <Box width="80%" display="flex" flexDirection="column" position="relative">
          <Flex alignItems="center" gap={3} pt={[6, 2, 1]}>
            <Image 
              src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png" 
              alt="school-logo" 
              boxSize="40px" 
            />
            <Text color="gray.300" fontSize="md">My Application</Text>
          </Flex>
          <Outlet context={{ inputStyle }} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Welcome;
