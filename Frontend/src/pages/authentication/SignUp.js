import axios from "axios";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Select, useToast } from "@chakra-ui/react";
import InputPassword from "../../components/InputPassword";
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";

const Base_url = process.env.REACT_APP_BACKEND_URL;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { inputStyle } = useOutletContext();
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (!role) {
      toast({
        title: "Please select a role (Brand/Creator).",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = { name, email, password, role };
      const res = await axios.post(`${Base_url}/signup`, userData);

      if (res.status === 201) {
        setLoading(false);
        toast({
          title: "User registered successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/"); 
      }
    } catch (error) {
      setLoading(false);
      console.error("error message: ",error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast({
        title: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Box
      width="100%"
      flexDirection="column"
      p={3}
      mb={4}
      mt={5}
      animate="sideInLeft"
    >
      <Heading as="h1" size="xl" color="gray.800" mb={2}>
        Sign Up
      </Heading>
      <Text fontSize="md" color="gray.600" mb={6}>
        Create your account to keep up with news!
      </Text>

      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            mb={4}
            {...inputStyle}
          />

          <Input
            name="email"
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
            mb="15px"
          />

          <InputPassword
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            state={confirmPassword}
            setPassword={setConfirmPassword}
          />

          <Select
            placeholder="I am a"
            {...inputStyle}
            p={0}
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="Brand">Brand</option>
            <option value="Creator">Creator</option>
          </Select>
        </FormControl>

        <Button
          width="40%"
          height="50px"
          mb="45px"
          bg="purple.500"
          color="white"
          p={3}
          borderRadius="xl"
          textAlign="md"
          _hover={{ bg: "purple.600" }}
          transition="all 0.3s ease-in-out"
          transform="scale(1)"
          isLoading={loading}
          mt="20px"
          type="submit"
        >
          {loading ? "Please wait..." : "Sign Up"}
        </Button>
      </form>

      <Text color="gray.600" mt={3} position="absolute" bottom="35px">
        Have an account already?{" "}
        <Text
          as="span"
          color="purple.500"
          cursor="pointer"
          onClick={() => navigate("/")}
          _hover={{ textDecoration: "underline" }}
        >
          Login
        </Text>
      </Text>
    </Box>
  );
};

export default SignUp;
