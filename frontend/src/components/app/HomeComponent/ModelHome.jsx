import React from 'react';
import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Link,
  Flex,
} from "@chakra-ui/react";
import ModelGallery from '../ModelGalleryComponent/ModelGallery';
import { models } from '../ModelGalleryComponent/ModelsData';

const ModelHome = () => {
   
    return (
        <>
         <Box bg="black" color="white" minH="100vh" fontFamily="sans-serif">
                {/* Hero Banner */}
                <Box
                    w="100%"
                    // h={{ base: "250px", md: "450px",lg:"836px"}}
                    bgImage="url('/banner.jpg')"
                    bgPos="center"
                    bgSize="cover"
                    alignItems="center"
                    justifyContent="center"
                    padding="0px .75rem"
                    display={{base:"none",sm:"flex"}}
                >
                    <Image src="/Banner-Single.jpg" alt="banner" maxW="100%"
                    h="auto"
                    w="100%"/>
                </Box>  
                <Box
                    w="100%"
                    display={{base:"block",sm:"none"}}
                    p="0"
                    mt="-6px"
                    mb="40px"
                    overflow="hidden"
                    position="relative"
                    _before={{
                    content: '""',
                    h: "20%",
                    w: "100%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bg: "linear-gradient(180deg, #00000000, #000000)",
                }}
                >
                    <Image src="/phone-banner-single.png" alt="banner" w="100%"
                    h="calc(var(--vh, 1vh) * 100 - 40px)"
                    objectFit="cover"
                    objectPosition="top"/>
                    <Box textAlign="center" position="absolute" right="50px" bottom="140px">
                        <Text
                            as="h1"
                            fontSize="40px"
                            color="#808080"
                            fontFamily="'ElMessiri', sans-serif"
                            letterSpacing="1.5px"
                            w={"108px"}
                        >
                            <Box as="span" display="block" lineHeight={"26px"}>
                            Lust
                            </Box>
                            <Box as="span" fontSize="20px" right="-7px">
                            For
                            </Box>
                            <Box as="span">
                            Life
                            </Box>
                        </Text>
                    </Box>
                </Box>    
                <ModelGallery models={models}/>       
            </Box>
        </>
    );
};

export default ModelHome;