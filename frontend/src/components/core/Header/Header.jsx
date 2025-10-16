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
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  UnlockIcon,
  AddIcon,
  CloseIcon,
} from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const menuItems = [
  { label: "Models", href: "/models" },
  { label: "Members", href: "/Members" },
  { label: "Concierge", href: "/concierge" },
  { label: "Philosophy", href: "/Philosophy" },
  { label: "Contact", href: "/contact-us" },
  { label: "Blog", href: "/blog" },
  { label: "Faq", href: "/faq" },
];
export default function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const handleFlip = () => setIsLogin(!isLogin);

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
  const drawerPlacement = useBreakpointValue({ base: "left", lg: "right" });
  return (
    <Box
      position="sticky"
      top={0}
      width="100%"
      backgroundColor="rgb(0 0 0 / 50%)"
      backdropFilter="blur(42px)"
      boxShadow={
        isScrolled
          ? "1px 6px 38px 7px rgb(255 255 255 / 8%)"
          : "1px 4px 28px 5px rgb(255 255 255 / 3%)"
      }
      // borderBottom={isScrolled ? "1px solid #eeeeee2e" : "none"}
      zIndex={1000}
      transition="all 0.3s ease"
    >
      {/* Separator line */}
      <Box height="1px" backgroundColor="#4a4a4a" width="100%" />

      <Flex
        h={{ base: "59px", lg: "72px" }}
        alignItems="center"
        justifyContent="space-between"
        maxW={{ base: "720px", lg: "1666.74px" }}
        m={"auto"}
        px="12px"
      >
        {/* Left: Hamburger on mobile, Rabbit icon on tablet/desktop */}
        <Box display={{ base: "block", lg: "none" }}>
          <IconButton
            display="block"
            aria-label="Menu"
            variant="ghost"
            onClick={isOpen ? onClose : onOpen}
            _focusVisible={'none'}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            icon={
              <Box position="relative" w="20px" h="20px">
                {/* Top line */}
                <Box
                  position="absolute"
                  top={isOpen ? "9px" : "5px"}
                  left="0"
                  w="20px"
                  h="1px"
                  bg="#888"
                  transform={isOpen ? "rotate(45deg)" : "rotate(0deg)"}
                  transition="transform 0.3s ease, top 0.3s ease"
                />

                {/* Bottom line */}
                <Box
                  position="absolute"
                  bottom={isOpen ? "9px" : "5px"}
                  left="0"
                  w="20px"
                  h="1px"
                  bg="#888"
                  transform={isOpen ? "rotate(-45deg)" : "rotate(0deg)"}
                  transition="transform 0.3s ease, bottom 0.3s ease"
                />
              </Box>
            }
          />
        </Box>

        <Box display={{ base: "none", lg: "block" }} w={"30%"}>
          <Link href={"/"}>
          <Image
            src="/bunny-icon-header.svg"
            alt="logo"
            w={"30px"}
            h={"24px"}
          />
          </Link>
        </Box>

        {/* Center: rabbit on mobile, wordmark on tablet/desktop */}
        <Box
          w={"30%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          ml={"15px"}
        >
          <Link href={"/"}>
          <Image
            src="/bunny-icon-header.svg"
            alt="logo"
            display={{ base: "block", lg: "none" }}
            w={"30px"}
          />
          </Link>
          <Box
            w={"100%"}
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            justifyContent="center"
          >
            <Img
              src="/bunny-models-logo-font.svg"
              alt="logo"
              display={{ base: "none", lg: "block" }}
            />
          </Box>
        </Box>

        {/* Right Icons */}
        <HStack
          spacing={"1rem"}
          w={{ base: "auto", lg: "30%" }}
          justifyContent="flex-end"
          gap={{ base: "5px", lg: "5px" }}
        >
          {/* Phone Icon */}
          <Img
            src="/phone-icon.svg"
            alt="logo"
            w="25px"
            h={"20px"}
            ml={{ base: "0px !important" }}
          />
          {/* User Icon with click-toggled auth dropdown */}
          <Box position="relative" ref={authMenuRef} ml="0px !important">
            <Img
              src="/profile-icon.svg"
              alt="user"
              cursor="pointer"
              onClick={() => setAuthMenuOpen(!authMenuOpen)}
              w={"26px"}
              h={"20px"}
              display={{ base: "none", md: "block" }}
            />
            <Box display={{base:"block",md:"none"}}>
            <Link href="/login">
            <Img
              src="/profile-icon.svg"
              alt="user"
              cursor="pointer"
              w={"26px"}
              h={"20px"}
            /></Link>
            </Box>
            <Box
              position="absolute"
              right={0}
              top="52px"
              w="360px"
              zIndex={1200}
              opacity={authMenuOpen ? 1 : 0}
              transform={
                authMenuOpen
                  ? "translateY(-10) scale(1)"
                  : "translateY(-6px) scale(0.98)"
              }
              pointerEvents={authMenuOpen ? "auto" : "none"}
              transition="opacity 160ms ease, transform 180ms ease"
              perspective="1000px" // important for 3D flip
            >
              <Box
                position="relative"
                width="100%"
                height="100%"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.6s",
                  transform: isLogin ? "rotateY(0deg)" : "rotateY(180deg)",
                }}
              >
                {/* Front: Login */}
                <Box
                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <LoginForm switchToSignup={handleFlip} />
                </Box>

                {/* Back: Signup */}
                <Box
                  style={{
                    backfaceVisibility: "hidden",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <SignupForm switchToLogin={handleFlip} />
                </Box>
              </Box>
            </Box>
          </Box>
          {/* Hamburger on desktop */}
          <Box display={{ base: "none", lg: "block" }} ml="0px !important">
            <IconButton
              display="block"
              minW="auto"
              aria-label="Menu"
              variant="ghost"
              onClick={isOpen ? onClose : onOpen}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ background: "none" }}
              icon={
                <Box position="relative" w="20px" h="20px">
                  {/* Top line */}
                  <Box
                    position="absolute"
                    top={isOpen ? "6px" : "4px"} // 6px from top
                    left="0"
                    w="20px"
                    h="1px"
                    bg="#888"
                    borderRadius="0.5px"
                    transform={
                      isOpen
                        ? "rotate(45deg) translate(0, 5px)"
                        : "rotate(0deg)"
                    }
                    transition="transform 0.3s ease"
                  />

                  {/* Bottom line */}
                  <Box
                    position="absolute"
                    top={isOpen ? "13px" : "14px"} // 13px from top
                    left="0"
                    w="20px"
                    h="1px"
                    bg="#888"
                    borderRadius="0.5px"
                    transform={
                      isOpen
                        ? "rotate(-45deg) translate(0, -5px)"
                        : "rotate(0deg)"
                    }
                    transition="transform 0.3s ease"
                  />
                </Box>
              }
            />
          </Box>
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement={drawerPlacement} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent
          bg="black"
          border="1px solid #272727"
          boxShadow="0 0 20px rgba(255, 255, 255, 0.1)"
          borderRadius="8px"
          maxW={{ base: "100%", lg: "230px" }}
          mx="auto"
          mt={{ base: "59px", lg: "64px" }}
          mr={{ base: "0", md: "16px", lg: "24px", xl: "112px" }}
          h={{ base: "100%", lg: "max-content" }}
          p="30px"
        >
          <DrawerBody p={"0"} >
            <Stack as="nav" gap={'0px'} h="100%" justifyContent="center">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  as={Link}
                  href={item.href}
                  bg="transparent"
                  colorScheme="transparent"
                  w="100%"
                  justifyContent={{ base: "center", lg: "flex-end" }}
                  textAlign={{ base: "center", lg: "right" }}
                  color="#646464"
                  fontSize={{ base: "28px", lg: "18px" }}
                  fontWeight="400"
                  fontFamily="'Aileron', sans-serif"
                  _hover={{ color: "#ccc", bg: "transparent" }}
                  h="auto"
                  p={{
                    base: "0px 0px 16px 0px",
                    lg:
                      index === menuItems.length - 1
                        ? "0px 0px 10px 0px"
                        : "0px 0px 13px 0px",
                  }}
                  mt="0 !important"
                  _focusVisible={'none'}
                  letterSpacing="1px"
                  onClick={onClose}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
