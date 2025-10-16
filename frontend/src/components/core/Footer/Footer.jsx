import React from "react";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

const Footer = ({ isNexusPortal }) => {
  return (
    <>
      <Box fontFamily="sfPro" px={{ base: "22px", md: "36px" }}>
        <Box
          maxW={{ base: "720px", lg: "1671.74px" }}
          mx={"auto"}
          mt="50px"
          mb="30px"
          p={{ base: "23px 0px", lg: "23px 50px" }}
          sx={{
            borderTop: "1px solid rgb(129 129 129 / 30%)",
            borderBottom: "1px solid rgb(129 129 129 / 30%)",
          }}
        >
          <Flex
            justifyContent="space-between"
            alignItems={"center"}
            fontSize={"13px"}
            letterSpacing="2.5px"
            fontWeight="300"
            color="#808080"
          >
            <Box display={"flex"} flexDir={"column"}>
              <Link href="/philosophy" mb={{ base: "15px", lg: "12px" }}>
                Philosophy
              </Link>
              <Link href="#" mb={{ base: "15px", lg: "12px" }}>
                Members
              </Link>
              <Link href="/blog" mb={{ base: "15px", lg: "12px" }}>
                Blog
              </Link>
            </Box>

            <Box w={"130px"} display={{ base: "none", md: "block" }}>
              <Link href="#" display={"flex"} alignItems={"center"}>
                <Image
                  src="/footer-logo.svg"
                  alt="Bunny Models company logo"
                />
              </Link>
            </Box>

            <Box display={"flex"} flexDir={"column"} textAlign={"right"}>
              <Link href="/concierge" mb={{ base: "15px", lg: "12px" }}>
                Concierge
              </Link>
              <Link href="/application" mb={{ base: "15px", lg: "12px" }}>
                Apply
              </Link>
              <Link href="/faq" mb={{ base: "15px", lg: "12px" }}>
                FAQ
              </Link>
            </Box>
          </Flex>
        </Box>

        <Box textAlign={"center"} pb="24px" fontFamily="sfPro">
          <Box
            fontSize={{ base: "10px", md: "12px", lg: "12px" }}
            letterSpacing={{ base: "2px", md: "2.5px" }}
            fontWeight="300"
            color="#818181"
          >
            <Link href="/terms-conditions" mx={{ base: "4px", md: "8px" }} _hover={{textDecor:"none",color:"#fff"}}>
              Terms & Conditions
            </Link>{" "}
            |
            <Link href="/privacy-policy" mx={{ base: "4px", md: "8px" }} _hover={{textDecor:"none",color:"#fff"}}>
              Privacy Policy
            </Link>{" "}
            |
            <Link href="/disclaimer" mx={{ base: "4px", md: "8px" }} _hover={{textDecor:"none",color:"#fff"}}>
              Disclaimer
            </Link>
          </Box>

          <Text
            fontSize={{ base: "10px", md: "12px", lg: "12px" }}
            letterSpacing="1.5px"
            fontWeight="400"
            color="#4D4D4D"
          >
            © 2025 Bunny Models. All rights reserved.
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
