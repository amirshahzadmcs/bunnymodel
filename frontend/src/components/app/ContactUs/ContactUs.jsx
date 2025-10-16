import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  VisuallyHidden,
  useToast,
  Flex,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import { FiMail, FiUser, FiSend, FiPhone } from "react-icons/fi";

export default function ContactUs() {
  return (
    <Box bg="#050505" minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW={{ base: "696px", lg: "1240px" }} mx={"auto"} px="15px">
        <Heading
                                as={"h2"}
                                px="7px"
                                pt="9px"
                                pb="5px"
                                textAlign="center"
                                letterSpacing="1.12px"
                                mt="8px"
                                fontWeight="400"
                                fontSize="18px"
                                lineHeight={"28px"}
                                fontFamily="sfPro"
                                color="#818181"
                                borderBottom={"1px solid rgb(129 129 129 / 30%)"}
                                mb={"40px"}
        >
          Contact Us
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", lg: ".9fr 1.1fr" }}
          gap={{ base: 8, md: 12 }}
          alignItems="start"
        >
          {/* LEFT: Form */}
          <GridItem>
            <Box as="form" aria-label="Contact form" maxW="full">
              <Stack
                gap="21px"
                maxW={{ base: "100%", lg: "548px" }}
                mt={{ base: "16px", md: "48px", lg: "0" }}
              >
                {/* Email */}
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Box
                      bg="#141414"
                      w="47px"
                      h="47px"
                      borderRadius="15px"
                      position="absolute"
                      zIndex="1"
                      left="6px"
                      top="6.7px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* Example icon inside */}
                      <Image
                        src="/email.svg"
                        alt="email"
                      />
                    </Box>
                  </InputLeftElement>
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value=""
                    border="1px solid"
                    borderColor="#171717"
                    borderRadius="18px"
                    w="100%"
                    h="60px"
                    bg="#0D0D0D"
                    pl="65px"
                    color="#ffff"
                    fontFamily="'Aileron', sans-serif"
                    fontSize="16px"
                    _placeholder={{ color: "#808080" }}
                    aria-required="true"
                    _hover={{borderColor:"transparent"}}
                    _focusVisible={{ borderColor: "#fff" }}
                  />
                </InputGroup>

                {/* Subject */}
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Box
                      bg="#141414"
                      w="47px"
                      h="47px"
                      borderRadius="15px"
                      position="absolute"
                      zIndex="1"
                      left="6px"
                      top="6.7px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* Example icon inside */}
                      <Image
                        src="/user.svg"
                        alt="subject"
                      />
                    </Box>
                  </InputLeftElement>
                  <Input
                    id="email"
                    placeholder="Enter the subject of your message"
                    border="1px solid"
                    borderColor="#171717"
                    borderRadius="18px"
                    w="100%"
                    h="60px"
                    bg="#0D0D0D"
                    pl="65px"
                    color="#ffff"
                    fontFamily="'Aileron', sans-serif"
                    fontSize="16px"
                    _placeholder={{ color: "#808080" }}
                    aria-required="true"
                    _hover={{borderColor:"transparent"}}
                    _focusVisible={{ borderColor: "#fff" }}
                  />
                </InputGroup>

                {/* Message */}
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Box
                      bg="#141414"
                      w="47px"
                      h="47px"
                      borderRadius="15px"
                      position="absolute"
                      zIndex="1"
                      left="6px"
                      top="6.7px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {/* Example icon inside */}
                      <Image
                        src="/align.svg"
                        alt="subject"
                      />
                    </Box>
                  </InputLeftElement>
                  <Textarea
                    id="message"
                    placeholder="What can we help you with today?"
                    border="1px solid"
                    borderColor="#171717"
                    borderRadius="18px"
                    w="100%"
                    h="200px"
                    bg="#0D0D0D"
                    pl="65px"
                    color="#ffff"
                    fontFamily="'Aileron', sans-serif"
                    fontSize="16px"
                    _placeholder={{ color: "#808080" , pt:"12px"}}
                    aria-required="true"
                    _hover={{borderColor:"transparent"}}
                    _focusVisible={{ borderColor: "#fff" }}
                  />
                </InputGroup>

                {/* Submit */}
                <Flex direction="column" gap={3} mt="24px">
                  <Button
                    type="submit"
                    bg="#8C8C8C"
                    color="#000000"
                    _hover={{ bg: "#8C8C8C" }}
                    h="60px"
                    borderRadius="16px"
                    fontFamily="'Aileron', sans-serif"
                  >
                    Submit
                  </Button>

                  <Button
                    as="a"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    outline="none"
                    border="2px solid #4d4d4d"
                    color="#cccccc"
                    px="40px"
                    py="8px"
                    borderRadius="15px"
                    transition="all 0.3s ease"
                    fontWeight="400"
                    letterSpacing="1px"
                    fontSize="16px"
                    position="relative"
                    overflow="hidden"
                    display="inline-flex"
                    alignItems="center"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                    h="60px"
                    mt="24px"
                    fontFamily="'Aileron', sans-serif"
                    pos={"relative"}
                    _after={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-200%",
                      height: "100%",
                      width: "200%",
                      background:
                        "linear-gradient(110deg,transparent 0%,rgba(255, 255, 255, 0.08) 40%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.08) 60%,transparent 100%  )",
                      animation: "shimmerMove 2.2s infinite",
                      transition: "opacity 0.4s ease",
                      opacity: 0,
                      zIndex: 1,
                    }}
                  >
                    WHATSAPP NOW
                    <Image
                      src="/whatsapp-icon.svg"
                      alt="whatsapp"
                      ml="20px"
                    
                    />
                  </Button>

                  <Text
                    fontSize="14px"
                    color="#818181"
                    mt="16px"
                    textAlign={"center"}
                    fontFamily="'Aileron', sans-serif"
                  >
                    Contact Us at Anytime of Day & Night | 24/7 Global Support
                  </Text>
                </Flex>
              </Stack>
            </Box>
          </GridItem>

          {/* RIGHT: Decorative card / illustration */}
          <GridItem h={"100%"} display={{ base: "none", lg: "block" }}>
            <Box
              border="6px solid #111111"
              borderRadius="26px"
              height="calc(100% - 152px)"
              width="100%"
              bg="#000000"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {/* Replace with actual image if you have one */}
              <Image
                src="/login_illustration2.png"
                w={"50%"}
                alt="Contact Us Banner"
              />
            </Box>
          </GridItem>
        </Grid>    
      </Container>
    </Box>
  );
}
