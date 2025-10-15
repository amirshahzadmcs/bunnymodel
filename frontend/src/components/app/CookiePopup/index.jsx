import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CookiePopup = () => {
  const [isCookies, setisCookies] = useState(false);
  const handleCookies = () => {
    setisCookies((prev) => !prev);
  };
  return (
    <>
      {!isCookies ? (
        <Box>
          <Box
            pos="fixed"
            bottom="24px"
            right="24px"
            zIndex="1"
            borderRadius="8px"
            bg="rgb(0 0 0 / 66%)"
            backdropFilter="blur(10px)"
            p={{ base: "16px", md: "24px" }}
            maxW="360px"
            w={"100%"}
            border="1px solid #ffffff17"
            textAlign={"center"}
          >
            <Heading
              as={"h3"}
              fontFamily="'Aileron', sans-serif"
              fontSize="18px"
              fontWeight="400"
              color="rgb(129 129 129 / 80%)"
              mb={"10px"}
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
              gap={"6px"}
              textAlign={"center"}
            >
              Have a cookie!
              <Image
                src="https://s.w.org/images/core/emoji/16.0.1/svg/1f36a.svg"
                w="18px"
                alt="emoji"
              />
            </Heading>
            <Text
              fontFamily="'Aileron', sans-serif"
              fontSize="14px"
              fontWeight="400"
              color="rgb(129 129 129 / 80%)"
              mb={"15px"}
            >
              We use cookies to enhance your experience, analyze site traffic,
              and provide personalized content. See the{" "}
              <Link href="#" color="#979797">
                data protection.
              </Link>
            </Text>
            <Flex
              alignItems="center"
              gap="16px"
              mt="16px"
              justifyContent={"center"}
            >
              <Box w={"50%"}>
                <Button
                  w={"100%"}
                  background="none"
                  fontFamily="'Aileron', sans-serif"
                  fontSize="16px"
                  fontWeight="400"
                  color="#9d9d9d"
                  _hover={{ color: "white" }}
                  _active={{ bg: "transparent" }}
                >
                  Deny
                </Button>
              </Box>
              <Box w={"50%"}>
                <Button
                  w={"100%"}
                  h={"44px"}
                  fontFamily="'Aileron', sans-serif"
                  fontSize="16px"
                  fontWeight="400"
                  bg="#81818170"
                  color="#b5b5b5"
                  _hover={{ bg: "#8181814a", color: "#fff" }}
                  borderRadius="8px"
                  _focusVisible={{ boxShadow: "none" }}
                  _active={{ bg: "#81818170" }}
                  p={"10px"}
                  onClick={handleCookies}
                >
                  Accept
                </Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      ) : (
        <Box display="none" />
      )}
    </>
  );
};

export default CookiePopup;
