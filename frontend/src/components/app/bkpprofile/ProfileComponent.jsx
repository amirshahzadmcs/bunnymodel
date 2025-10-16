import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const models = [
  {
    name: "Haily",
    location: "Westminster",
    img: "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P1_01.jpg",
  },
  {
    name: "Eliza",
    location: "Soho",
    img: "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_01.jpg",
  },
  // ...rest of the models
];

const ProfileComponent = () => {
  // ✅ Move useState to top-level
  const [mainImage, setMainImage] = useState(
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_01.jpg"
  );

  const thumbnails = [
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_01.jpg",
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_02.jpg",
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_03.jpg",
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_04.jpg",
    "https://bunnymodels.com/wp-content/themes/bunny-child/models-picture/gallery/P2_05.jpg",
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
    className: "model-slide2",
  };

  const InfoList = ({ data }) => (
    <VStack align="start" spacing={2} p={{ base: "0", lg: "15px" }}>
      {data.map((item, index) => (
        <Text
          key={index}
          display="flex"
          w="100%"
          justifyContent="space-between"
          mt={"5px !important"}
        >
          <Text
            as="span"
            flex="1"
            fontWeight="400"
            fontSize={{ base: "14px", lg: "16px" }}
            fontFamily="'Aileron', sans-serif"
            color={"#808080"}
          >
            {item.label}
          </Text>
          <Text
            as="span"
            flex="1"
            fontWeight="400"
            fontSize={{ base: "14px", lg: "16px" }}
            fontFamily="'Aileron', sans-serif"
            color={"#B3B3B3"}
          >
            {item.value}
          </Text>
        </Text>
      ))}
    </VStack>
  );

  return (
    <Box bg="black" color="white" minH="100vh" py={1}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        gap="24px"
        maxW={{ base: "720px", lg: "1671.74px" }}
        mx="auto"
        px={{ base: "12px", lg: "12px" }}
      >
        {/* ✅ Left: Images */}
        <Box w={{ base: "100%", md: "50%", lg: "58%" }}>
          <Box
            maxH={{ base: "422px", lg: "764px" }}
            overflow="hidden"
            mt={{ base: "30px", lg: "0" }}
            display={{ base: "none", md: "block" }}
          >
            <Image
              src={mainImage}
              alt="Main profile image"
              w="100%"
              objectFit="cover"
              objectPosition="top"
              transition="opacity 0.4s ease"
            />
          </Box>

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
                alt={`thumbnail-${i}`}
                maxW={{ base: "65px", md: "76.5px", lg: "230px" }}
                objectFit="cover"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{ opacity: 0.8 }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </HStack>

          {/* ✅ Mobile slider */}
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
        </Box>

        {/* Right side (Profile Info, Lists, Buttons, etc.) stays same */}
        {/* You can keep your existing right-side code as is */}
      </Flex>
    </Box>
  );
};

export default ProfileComponent;
