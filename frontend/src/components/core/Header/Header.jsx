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
import { HamburgerIcon, UnlockIcon, AddIcon, CloseIcon } from "@chakra-ui/icons";
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
      backgroundColor="rgb(0 0 0 / 50%)"
      backdropFilter="blur(42px)"
      boxShadow={isScrolled ? "1px 6px 38px 7px rgb(255 255 255 / 8%)" : "1px 4px 28px 5px rgb(255 255 255 / 3%)"}
      borderBottom={isScrolled ? "1px solid #eeeeee2e" : "none"}
      zIndex={1000}
      transition="all 0.3s ease"
    >
      {/* Separator line */}
      <Box height="1px" backgroundColor="#4a4a4a" width="100%" />

      <Flex
        h={"72px"}
        alignItems="center"
        justifyContent="space-between"
        maxW={"1732.93px"}
        m={"auto"}
        px={4}
      >
        {/* Left: Hamburger on mobile, Rabbit icon on tablet/desktop */}
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            aria-label="Menu"
            icon={
              isOpen ? (
                <CloseIcon w={"1.5em"} h={"1.5em"} />
              ) : (
                <Box>
                  <Box w="20px" h="2px" bg="currentColor" mb="4px" />
                  <Box w="20px" h="2px" bg="currentColor" />
                </Box>
              )
            }
            color="#888888"
            bg="transparent"
            _hover={{ color: "#ccc", bg: "transparent" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Box>
        <Box display={{ base: "none", md: "block" }}>
          <Image src="/rabbit.png" alt="logo" w={'30px'} h={'24px'}/>
        </Box>

        {/* Center: rabbit on mobile, wordmark on tablet/desktop */}
        <Box>
          <Image src="/rabbit.png" alt="logo" display={{ base: "block", md: "none" }} />
          <Img src="/bunny-models-logo-font.svg" alt="logo" display={{ base: "none", md: "block" }} />
        </Box>

        {/* Right Icons */}
        <HStack spacing={'1rem'}>
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
            icon={
              isOpen ? (
                <CloseIcon w={"1.5em"} h={"1.5em"} />
              ) : (
                <Box>
                  <Box w="20px" h="2px" bg="currentColor" mb="4px" />
                  <Box w="20px" h="2px" bg="currentColor" />
                </Box>
              )
            }
            color="#888888"
            bg="transparent"
            _hover={{ color: "#ccc", bg: "transparent" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent 
          bg="black" 
          border="1px solid rgba(255, 255, 255, 0.1)"
          boxShadow="0 0 20px rgba(255, 255, 255, 0.1)"
          borderRadius="8px"
          maxW="300px"
          mx="auto"
          mt="20px"
        >
          
          <DrawerBody p={6}>
            <Stack as="nav" spacing={6}>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="#999999"
                fontSize="16px"
                fontWeight="400"
                _hover={{ color: "#ccc", bg: "transparent" }}
                py={2}
                px={0}
                h="auto"
                justifyContent="flex-start"
              >
                Philosophy
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="#999999"
                fontSize="16px"
                fontWeight="400"
                _hover={{ color: "#ccc", bg: "transparent" }}
                py={2}
                px={0}
                h="auto"
                justifyContent="flex-start"
              >
                Application
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="#999999"
                fontSize="16px"
                fontWeight="400"
                _hover={{ color: "#ccc", bg: "transparent" }}
                py={2}
                px={0}
                h="auto"
                justifyContent="flex-start"
              >
                Blog
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="#999999"
                fontSize="16px"
                fontWeight="400"
                _hover={{ color: "#ccc", bg: "transparent" }}
                py={2}
                px={0}
                h="auto"
                justifyContent="flex-start"
              >
                Faq
              </Button>
              <Button
                bg="transparent"
                colorScheme="transparent"
                w="100%"
                textAlign="left"
                color="#999999"
                fontSize="16px"
                fontWeight="400"
                _hover={{ color: "#ccc", bg: "transparent" }}
                py={2}
                px={0}
                h="auto"
                justifyContent="flex-start"
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
