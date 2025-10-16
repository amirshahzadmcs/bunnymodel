"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Img,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function BannerHome() {
  const color = useColorModeValue("foreground", "white");

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      color={"white"}
      bgImage={{ base: "url('/phone-banner-single.jpg')", md: "url('/Banner-Single.jpg')" }}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition={{ base: "right center", md: "center" }}
      minH={{ base: "100vh", md: "85vh" }}
    >
      {/* Overlay */}
      <Box
        // position="absolute"
        // top={0}
        // left={0}
        // right={0}
        // bottom={0}
        // backgroundColor="transparent"
        // backgroundImage="radial-gradient(at top left, #05026C59 0%, #A629F200 49%)"
        // opacity={0.79}
        // transition="background 0.3s, border-radius 0.3s, opacity 0.3s"
      />
      <Container
        maxW={"1340px"}
        p={0}
        minH="85vh"
        display={"flex"}
        ml={"auto"}
        mr={"auto"}
        pos={"relative"}
        alignItems={"center"}
        flexBasis={"auto"}
        flexGrow={1}
        flexShrink={"1"}
        justifyContent={"flex-start"}
      >
        
      </Container>
    </Box>
  );
}
