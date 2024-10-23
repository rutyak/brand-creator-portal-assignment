import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import InputPassword from "../../components/InputPassword";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [role, setRole] = useState("");

  const { inputStyle } = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const storedRoleType = localStorage.getItem("roleType");
      if (storedRoleType) {
        navigate(storedRoleType === "Brand" ? "/brand" : "/creator");
      }
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const obj = {
      email,
      password,
      role,
    };    
    try {
      const res = await axios.post(`${Base_url}/login`, obj);
      if (res.status === 200) {
        toast({
          title: "Login successful.",
          description: res.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        if (isChecked) {
          localStorage.setItem("token", res.data.token);
        }
        
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        navigate(res.data.user.role === "Brand" ? "/brand" : "/creator");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast({
        title: "Login failed.",
        description: error.response?.data?.message || "Invalid credentials",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box width="100%" flexDirection="column" p={3} mb={4} mt={5}>
      <Heading as="h1" size="xl" color="gray.800" mb={2}>
        Welcome Back!
      </Heading>
      <Text fontSize="md" color="gray.600" mb={6}>
        Hey, Welcome back to your special place
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            mb={4}
            {...inputStyle}
          />

          <InputPassword
            name="password"
            type="password"
            placeholder="Enter password"
            state={password}
            setPassword={setPassword}
          />

          <Select
            placeholder="I am a"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            {...inputStyle}
            p={0}
          >
            <option value="Brand">Brand</option>
            <option value="Creator">Creator</option>
          </Select>
        </FormControl>

        <Flex justifyContent="space-between" alignItems="center" mt={-3}>
          <Checkbox
            isChecked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            colorScheme="purple"
          >
            Remember me
          </Checkbox>
        </Flex>

        <Button
          width="40%"
          height="50px"
          mt={12}
          bg="purple.500"
          color="white"
          isLoading={loading}
          _hover={{ bg: "purple.600" }}
          type="submit"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <Text color="gray.600" position="absolute" bottom="35px">
        Don't have an account?{" "}
        <Text
          as="span"
          color="purple.500"
          cursor="pointer"
          onClick={() => navigate("/signup")}
          _hover={{ textDecoration: "underline" }}
        >
          Sign Up
        </Text>
      </Text>
    </Box>
  );
};

export default Login;
