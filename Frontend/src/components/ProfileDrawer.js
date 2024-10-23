import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  useDisclosure,
  useToast,
  VStack,
  HStack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProfileDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [company, setCompany] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setEmail(storedUser.email);
      setRole(storedUser.role);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError(true);
      return;
    }
    toast({
      title: "Profile updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Logged out successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    navigate("/");
  };

  return (
    <>
      <WrapItem>
        <Avatar onClick={onOpen} name={name} src="https://bit.ly/dan-abramov" cursor="pointer" />
      </WrapItem>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Avatar size="xl" name={name} mb={2} />
            <Text mt={2} fontSize="lg">
              {user?.role === "Brand" ? company || "Your Company" : name}
            </Text>
            <Text color="gray.500">{email}</Text>
          </DrawerHeader>

          <DrawerFooter>
              <Button colorScheme="red" w="full" onClick={handleLogout}>
                Logout
              </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ProfileDrawer;
