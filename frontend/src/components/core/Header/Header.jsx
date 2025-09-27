import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  ButtonGroup,
  Img,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, UnlockIcon, AddIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const authMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authMenuRef.current && !authMenuRef.current.contains(event.target)) {
        setAuthMenuOpen(false);
      }
    };
    if (authMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [authMenuOpen]);

  return (
    <Box
      position="sticky"
      top={0}
      width="100%"
      backgroundColor={isScrolled ? "rgb(20 20 20 / 82%)" : "transparent"}
      backdropFilter={isScrolled ? "saturate(180%) blur(10px)" : "none"}
      boxShadow={"0px 0px 20px 0px #26262680"}
      zIndex={1000}
      transition="all 0.3s ease"
    >
      {/* Separator line */}
      <Box height="1px" backgroundColor="#4a4a4a" width="100%" />

      <Flex
        h={"77px"}
        alignItems="center"
        justifyContent="space-between"
        maxW={"1350px"}
        m={"auto"}
        px={4}
      >
        {/* Left: Hamburger on mobile, Rabbit icon on tablet/desktop */}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon w={"2em"} h={"2em"} />}
            color="#888888"
            bg="transparent"
            _hover={{ color: "#ccc", bg: "transparent" }}
            onClick={onOpen}
          />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Image src="/rabbit.png" alt="logo" />
        </Box>

        {/* Center: rabbit on mobile, wordmark on tablet/desktop */}
        <Box>
          <Image src="/rabbit.png" alt="logo" display={{ base: "block", md: "none" }} />
          <Img src="/bunnymodel.png" alt="logo" display={{ base: "none", md: "block" }} />
        </Box>

        {/* Right Icons */}
        <HStack spacing={4}>
          {/* User Icon with click-toggled auth dropdown */}
          <Box position="relative" ref={authMenuRef}>
            <Img
              src="/usericon.png"
              alt="user"
              cursor="pointer"
              onClick={() => setAuthMenuOpen(!authMenuOpen)}
            />
              <Box
              position="absolute"
              right={0}
              mt={3}
              bg="#262626"
              color="#0f0f0f"
              borderRadius="6px"
              minW="200px"
              boxShadow="0px 0px 20px 0px #26262680"
              pt="8px"
              pb="8px"
              zIndex={1200}
              opacity={authMenuOpen ? 1 : 0}
              transform={
                authMenuOpen
                  ? "translateY(0) scale(1)"
                  : "translateY(-6px) scale(0.98)"
              }
              pointerEvents={authMenuOpen ? "auto" : "none"}
              transition="opacity 160ms ease, transform 180ms ease"
            >
              <Box
                position="absolute"
                top="-10px"
                right="16px"
                w="18px"
                h="18px"
               
               />

               <Button
                as={Link}
                href="/Login"
                onClick={() => setAuthMenuOpen(false)}
                leftIcon={<UnlockIcon w={4} h={4} />}
                variant="ghost"
                justifyContent="flex-start"
                w="100%"
                color="white"
                bg="transparent"
                _hover={{color:'grey' }}
                px={4}
                py={3}
                borderRadius={0}
               >
                Login
               </Button>
               <Button
                as={Link}
                href="/Register"
                onClick={() => setAuthMenuOpen(false)}
                leftIcon={<AddIcon w={4} h={4} />}
                variant="ghost"
                justifyContent="flex-start"
                w="100%"
                color="white"
                bg="transparent"
                _hover={{color:'grey' }}
                px={4}
                py={3}
                borderRadius={0}
              >
                Register
              </Button>
            </Box>
          </Box>

          {/* Phone Icon */}
          <Img src="/phnicon.png" alt="logo" />
          {/* Hamburger on desktop */}
          <IconButton
            display={{ base: "none", md: "inline-flex" }}
            aria-label="Menu"
            icon={<HamburgerIcon w={"2em"} h={"2em"} />}
            color="#888888"
            bg="transparent"
            _hover={{ color: "#ccc", bg: "transparent" }}
            onClick={onOpen}
          />
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="#2a2a2a">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="white"
                _hover={{ color: "#ccc", bg: "transparent" }}
              >
                Home
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="white"
                _hover={{ color: "#ccc", bg: "transparent" }}
              >
                About
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="white"
                _hover={{ color: "#ccc", bg: "transparent" }}
              >
                Services
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="white"
                _hover={{ color: "#ccc", bg: "transparent" }}
              >
                Contact
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
