import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Grid,
  Button,
  Divider,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ModelGallery from '../ModelGalleryComponent/ModelGallery';
import { models } from '../ModelGalleryComponent/ModelsData';
// Profile structured like meetings
  const profile = [
    { label: "Age", value: "24" },
    { label: "Nationality", value: "Norwegian" },
    { label: "Height", value: "165 cm" },
    { label: "Weight", value: "50 kg" },
    { label: "Hip", value: "90" },
    { label: "Bust", value: "85" },
    { label: "Waist", value: "65" },
    { label: "Orientation", value: "Bisexual" },
    { label: "City", value: "Zurich" },
    { label: "Languages", value: "English" },
  ];

  const localMeetings = [
    { label: "0-2 Hours", value: "1500 Euro" },
    { label: "Up to 3 Hours", value: "2000 Euro" },
    { label: "Up to 6 Hours", value: "3000 Euro" },
    { label: "Overnight", value: "4000 Euro" },
  ];

  const internationalMeetings = [
    { label: "Up to 24 Hours", value: "5000 Euro" },
    { label: "Up to 48 Hours", value: "8000 Euro" },
    { label: "Additional Each Day", value: "2000 Euro" },
  ];

const ProfileComponent = () => {
    // Reusable list renderer
  const InfoList = ({ data }) => (
    <VStack align="start" spacing={2} p={{base:"0",lg:"15px"}}>
      {data.map((item, index) => (
        <Text key={index} display="flex" w="100%" justifyContent="space-between" mt={"5px !important"}>
            <Text as="span" flex="1" fontWeight="400" fontSize={{base:"14px",lg:"16px"}} fontFamily="'Aileron', sans-serif" color={"#808080"}>
                {item.label}
            </Text>
            <Text as="span" flex="1" fontWeight="400" fontSize={{base:"14px",lg:"16px"}} fontFamily="'Aileron', sans-serif" color={"#B3B3B3"}>
                {item.value}
            </Text>
        </Text>
      ))}
    </VStack>
  );
const InfoList2 = ({ data }) => (
    <VStack align="start" spacing={2} p={{base:"0",lg:"15px"}}>
      {data.map((item, index) => (
        <Text key={index} display="flex" w="100%" justifyContent="space-between" mt={"5px !important"}>
            <Text as="span" fontWeight="400" fontSize={{base:"14px",lg:"16px"}} fontFamily="'Aileron', sans-serif" color={"#808080"}>
                {item.label}
            </Text>
            <Text as="span" fontWeight="400" fontSize={{base:"14px",lg:"16px"}} fontFamily="'Aileron', sans-serif" color={"#B3B3B3"}>
                {item.value}
            </Text>
        </Text>
      ))}
    </VStack>
  );
    return (
      <Box bg="black" color="white" minH="100vh"  py={1} mt={{base:"0px",md:"16px",lg:"48px"}}>
          {/* Top Section */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="center"
            gap="24px"
            maxW={{base:"720px",lg:"1671.74px"}}
            mx="auto"
            flexWrap={{base:"wrap",md:"nowrap"}}
            px={{base:"12px",lg:"12px"}}
          >
            {/* Left: Main Profile Image */}
            <Box w={{ base: "100%", md: "50%", lg: "58%" }}>
              {/* Name */}
              <Text
                px="7px"
                pt="9px"
                pb="5px"
                textAlign="center"
                letterSpacing="1px"
                mt="8px"
                mb={{ base: "0", lg: "20px" }}
                fontWeight="400"
                fontSize="18px"
                color="#cccccc"
                fontFamily="'Aileron', sans-serif"
                borderBottom={"1px solid rgb(129 129 129 / 30%)"}
                display={{ base: "block", md: "none" }}
              >
                Daniela
              </Text>

              {(() => {
                const [mainImage, setMainImage] = useState(
                  "/p2/P2_01.jpg"
                );

                const thumbnails = [
                  "/p2/P2_01.jpg",
                  "/p2/P2_02.jpg",
                  "/p2/P2_03.jpg",
                  "/p2/P2_04.jpg",
                  "/p2/P2_05.jpg",
                ];

                const sliderSettings = {
                  dots: true,
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  arrows: false,
                  autoplay: false,
                  autoplaySpeed: 3500,
                  pauseOnHover: true,
                  className:"model-slide2"
                };

                return (
                  <>
                    {/* ✅ Main Image for desktop/tablet */}
                    <Box
                      maxH={{ base: "422px", lg: "764px" }}
                      overflow="hidden"
                      mt={{ base: "30px", lg: "0" }}
                      display={{ base: "none", md: "block" }}
                    >
                      <Image
                        src={mainImage}
                        alt="Profile"
                        w="100%"
                        objectFit="cover"
                        objectPosition="top"
                        transition="opacity 0.4s ease"
                      />
                    </Box>

                    {/* ✅ Thumbnails for desktop */}
                    <HStack
                      mt="10px"
                      justifyContent="space-between"
                      gap={{ base: "5px", md: "10px" }}
                      display={{ base: "none", md: "flex" }}
                    >
                      {thumbnails.slice(1).map((img, i) => (
                        <Image
                          key={i}
                          src={img}
                          alt={`thumb-${i}`}
                          maxW={{ base: "65px", md: "76.5px", lg: "230px" }}
                          maxH="100%"
                          objectFit="cover"
                          objectPosition="top"
                          cursor="pointer"
                          transition="all 0.3s ease"
                          _hover={{ opacity: 0.8 }}
                          onClick={() => setMainImage(img)}
                          ml="0px !important"
                        />
                      ))}
                    </HStack>

                    {/* ✅ Mobile Slider */}
                    <Box display={{ base: "block", md: "none" }} mt="25px">
                      <Slider {...sliderSettings}>
                        {thumbnails.map((img, i) => (
                          <Box key={i} overflow="hidden">
                            <Image
                              src={img}
                              alt={`slide-${i}`}
                              w="100%"
                              h="468px"
                              objectFit="cover"
                              objectPosition="top"
                            />
                          </Box>
                        ))}
                      </Slider>
                    </Box>
                  </>
                );
              })()}
            </Box>

            {/* Right: Profile Info */}
            <Box w={{base:"100%",md:"50%",lg:"40%"}} fontSize="15px" lineHeight="28px" color="white">
                {/* Name */}
                <Text 
                  px="7px"
                  pt="9px"
                  pb="5px"
                  textAlign="center"
                  letterSpacing="1px"
                  mt={{base:"1px",lg:"8px"}}
                  mb={{base:"0",xl:"20px"}}
                  fontWeight="400"
                  fontSize="18px"
                  color="#cccccc"
                  fontFamily="'Aileron', sans-serif"
                  borderBottom={"1px solid rgb(129 129 129 / 30%)"}
                  display={{base:"none",md:"block"}}
                >
                    Daniela
                </Text>

                {/* Profile Info */}
                <InfoList data={profile} />

                

                {/* Local Meeting */}
                
                  <Text 
                    px="7px"
                    pt="9px"
                    pb="5px"
                    textAlign="center"
                    letterSpacing="1px"
                    mt="8px"
                    mb={{base:"0",lg:"20px"}}
                    fontWeight="400"
                    fontSize="18px"
                    fontFamily="'Aileron', sans-serif"
                    color="#cccccc"
                    borderBottom={"1px solid rgb(129 129 129 / 30%)"}
                  >
                      Local Meeting
                  </Text>
                  <InfoList data={localMeetings} />
                <Box display={{base:"block",md:"none",lg:"block"}}>
                  {/* International Meeting */}
                  <Text 
                    px="7px"
                    pt="9px"
                    pb="5px"
                    textAlign="center"
                    letterSpacing="1px"
                    mt="8px"
                    mb={{base:"0",lg:"20px"}}
                    fontWeight="400"
                    fontSize="18px"
                    fontFamily="'Aileron', sans-serif"
                    color="#cccccc"
                    borderBottom={"1px solid rgb(129 129 129 / 30%)"}
                  >
                      International Meeting
                  </Text>
                  <InfoList data={internationalMeetings} />

                  {/* Action Button */}
                  <Box mt={8} textAlign={"center"}>
                      <Text fontSize="18px" fontFamily="'Aileron', sans-serif" fontWeight="400" textAlign="center" color={"#ccc"}>
                          For Bookings
                      </Text>
                      <Button
                        position="relative"
                        mt={6}
                        w="233px"
                        h="60px"
                        bg="transparent"
                        border="3px solid #4d4d4d"
                        borderRadius="15px"
                        gap="16px"
                        fontSize="16px"
                        fontFamily="'Aileron', sans-serif"
                        fontWeight="400"
                        color="#818181"
                        overflow="hidden"
                        transition="all 0.3s ease"
                        _hover={{
                          borderColor: "#ffffffad",
                          bg: "#1a1a1a",
                          color: "#fff",
                          '& img': {
                            filter: 'brightness(2)',
                          },
                          '&::before': {
                            animation: 'shimmer .5s linear forwards',
                          },
                        }}
                        sx={{
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-75%',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
                            transform: 'skewX(-20deg)',
                            pointerEvents: 'none', // ensures shimmer doesn't block hover
                          },
                          '@keyframes shimmer': {
                            '0%': { left: '-75%' },
                            '100%': { left: '125%' },
                          },
                        }}
                      >
                        Whatsapp Now
                        <Image src="/Whatsapp _Icon_White.svg" alt="whatsapp" w="24px" />
                      </Button>

                  </Box>
                </Box>  
            </Box>
          </Flex>
          <Box maxW={{base:"720px"}} display={{base:"none",md:"block",lg:"none"}} mt="16px" mx="auto" px="12px">
              {/* International Meeting */}
                <Text 
                  px="7px"
                  pt="9px"
                  pb="5px"
                  textAlign="center"
                  letterSpacing="1px"
                  mt="8px"
                  mb="20px"
                  fontWeight="400"
                  fontSize="18px"
                  fontFamily="'Aileron', sans-serif"
                  color="#818181"
                  sx={{
                    borderBottom: "1px solid transparent",
                    borderImage: "linear-gradient(90deg, #ffffff00, rgba(248, 248, 248, 0.58) 50%, #ffffff00) 1",
                    borderImageSlice: 1,
                  }}
                >
                    International Meeting
                </Text>
                <InfoList2 data={internationalMeetings} />

                {/* Action Button */}
                <Box mt={12} textAlign={"center"}>
                    <Text fontSize="18px" fontFamily="'Aileron', sans-serif" fontWeight="400" textAlign="center" color={"#ccc"}>
                        For Bookings
                    </Text>
                    <Button
                        mt={6}
                        w={"233px"}
                        bg="transparent"
                        border="3px solid #4d4d4d"
                        borderRadius="15px"
                        _hover={{ 
                          borderColor:"#fff"
                        }}
                        h={"60px"}
                        gap={"16px"}
                        fontSize="16px" fontFamily="'Aileron', sans-serif" fontWeight="400"
                        color={"#818181"}
                    >
                        Whatsapp Now
                        <Image src="/Whatsapp _Icon_White.svg" alt="whatsap" w={"24px"}/>
                    </Button>
                </Box>
              </Box>
          {/* Gallery Section */}
             <ModelGallery models={models}/>

        </Box>
    );
};

export default ProfileComponent;