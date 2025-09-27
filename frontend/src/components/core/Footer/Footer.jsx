import {
  Box,
  Container,
  Text,
  Link,
  Flex,
  VStack,
  Image,
  Img,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box bg="black" width="100%">
      <Container maxW="1200px" py={8}>
        {/* Main Footer Content */}
        <Flex
          justify="space-between"
          align="center"
          py={8}
          borderTop="1px solid transparent"
          borderBottom="1px solid transparent"
          sx={{
            borderImageSource:
              "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
            borderImageSlice: 1,
            borderImageWidth: 1,
            borderImageOutset: 0,
            borderImageRepeat: "stretch",
          }}
        >
          {/* Left Navigation */}
          <VStack
            align="flex-start"
            spacing={4}
            color="white"
            fontSize="16px"
            fontFamily="sans-serif"
          >
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              Philosophy
            </Link>
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              Members
            </Link>
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              Blog
            </Link>
          </VStack>

          {/* Center Logo and Brand */}
          <VStack align="center" spacing={2}>
            <Image
              src="/rabbit.png"
              alt="Bunny Models Logo"
              width="40px"
              height="40px"
              filter="brightness(0) invert(1)"
            />
            <Img src="/bunnymodel.png" alt="logo" />
          </VStack>

          {/* Right Navigation */}
          <VStack
            align="flex-end"
            spacing={4}
            color="#808080"
            fontSize="15px"
            fontFamily="Aileron"
            lineHeight={"39.66px"}
            letterSpacing={"9%"}
          >
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              Concierge
            </Link>
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              Apply
            </Link>
            <Link
              href="#"
              color="#808080"
              fontSize="15px"
              fontFamily="Aileron"
              lineHeight={"39.66px"}
              letterSpacing={"9%"}
              _hover={{ color: "#ccc" }}
            >
              FAQ
            </Link>
          </VStack>
        </Flex>

        {/* Middle horizontal line */}

        {/* Bottom Section - Legal and Copyright */}
        <Flex direction="column" align="center" gap={4} py={"24px"}>
          {/* Legal Links */}
          <Flex
            gap={4}
            align="center"
            fontSize="12px"
            color="#808080"
            fontFamily="Aileron"
            lineHeight={"16px"}
          >
            <Link href="#" _hover={{ color: "#ccc" }}>
              Terms & Conditions
            </Link>
            <Text>|</Text>
            <Link href="#" _hover={{ color: "#ccc" }}>
              Privacy Policy
            </Link>
            <Text>|</Text>
            <Link href="#" _hover={{ color: "#ccc" }}>
              Disclaimer
            </Link>
          </Flex>

          {/* Copyright */}
          <Text
            fontSize="14px"
            color="#80808099"
            fontFamily="Aileron"
            lineHeight={"16px"}
            textAlign="center"
          >
            Copyright © 2025 Bunny Models. All rights reserved.
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}
