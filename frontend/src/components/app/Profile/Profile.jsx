import React, { useState, useEffect } from "react";
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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axiosClient from "../../../utils/axiosClient";
import ApiImage from "../Apiimage/ApiImage";

const Profile = () => {
  const router = useRouter();
  const { username } = router.query;

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchModel = async () => {
      if (!username) return;
      try {
        setLoading(true);
        const response = await axiosClient.get(`/model/${username}`);
        if (response.data.status === "success") {
          setModel(response.data.model);
        } else {
          setError(response.data.message || "Model not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch model data");
      } finally {
        setLoading(false);
      }
    };

    fetchModel();
  }, [username]);

  if (loading) {
    return (
      <Center minH="100vh">
        <VStack spacing={4}>
          <Spinner size="xl" color="white" />
          <Text color="white">Loading model profile...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh">
        <Text color="red">{error}</Text>
      </Center>
    );
  }

  if (!model) {
    return (
      <Center minH="100vh">
        <Text color="white">Model not found</Text>
      </Center>
    );
  }

  // Reusable list renderer
  const InfoList = ({ data }) => (
    <VStack align="start" gap={'18px'}>
      {data.map((item, index) => (
        <HStack key={index} w="100%" justifyContent="space-between" gap={"0px"}>
          {/* Label */}
          <Text
            flex="1"
            color="#808080"
            fontSize="16px"
            fontFamily="Aileron"
            fontWeight="400"
          >
            {item.label}:
          </Text>

          {/* Value */}
          <Text
            flex="1"
            textAlign="left"
            color="#b3b3b3"
            fontSize="16px"
            fontFamily="Aileron"
            fontWeight="500"
          >
            {item.value}
          </Text>
        </HStack>
      ))}
    </VStack>
  );

  return (
    <Box
      bg="black"
      color="white"
      minH="100vh"
      px={{ base: 4, md: 12 }}
      pb={8}
      pt={"55px"}
    >
      {/* Top Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        gap={8}
        maxW={{
          base: "100%",
          lg: "960px",
          xl: "960px",
          xxl: "1300px",
          xxxl: "1671.74px",
        }}
        mx="auto"
      >
        {/* Left: Main Profile Image */}
        <Box w={{ base: "100%", md: "60%" }}>
          <ApiImage
            src={model.images?.[selectedImageIndex]?.image || "P1_01.jpg"}
            folder="P1"
            alt={`${model.firstname} ${model.lastname}`}
            w="100%"
            h="750px" // 🔥 Fixed height 750px
            objectFit="cover"
            borderRadius="md"
            objectPosition="top"
          />

          {/* Thumbnail Row */}
          <HStack spacing={4} overflowX="auto" py={2}>
            {model.images?.map((image, idx) => (
              <Box
                key={idx}
                minW={{ base: "22%", md: "18%" }}
                bg="#0E0E0E"
                cursor="pointer"
                transition="opacity 0.3s ease"
                _hover={{ opacity: 0.8 }}
                onClick={() => setSelectedImageIndex(idx)}
              >
                <ApiImage
                  src={image.image}
                  folder="P1"
                  alt={`${model.firstname} ${model.lastname} - ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </Box>
            ))}
          </HStack>
        </Box>

        {/* Right: Profile Info */}
        <Box
          w={{ base: "100%", md: "40%" }}
          fontSize="15px"
          lineHeight="28px"
          color="white"
        >
          <Box
            borderBottom="1px solid transparent"
            sx={{
              borderImageSource:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
              borderImageSlice: 1,
              borderImageWidth: 1,
              borderImageOutset: 0,
              borderImageRepeat: "stretch",
            }}
            margin={"8px 0px 20px 0px"}
            p={"9px 7px 5px 0"}
          >
            {/* Name */}
            <Text
              color="#CCCCCC"
              textAlign="center"
              fontSize="18px"
              fontFamily={"Aileron"}
              fontWeight={"400"}
              lineHeight={"23PX"}
              letterSpacing={"11.72%"}
            >
              {model.firstname} {model.lastname}
            </Text>
          </Box>

          {/* Profile Info */}
          <InfoList
            data={[
              { label: "Age", value: model.age },
              { label: "Nationality", value: model.nationality },
              { label: "Height", value: model.height },
              { label: "Weight", value: model.weight },
              { label: "Hip", value: model.hip },
              { label: "Bust", value: model.bust },
              { label: "Waist", value: model.waist },
              { label: "Orientation", value: model.orientation },
              { label: "City", value: model.city },
              { label: "Languages", value: model.languages },
            ]}
          />

          {/* Local Meeting */}
          <Box
            borderBottom="1px solid transparent"
            sx={{
              borderImageSource:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
              borderImageSlice: 1,
              borderImageWidth: 1,
              borderImageOutset: 0,
              borderImageRepeat: "stretch",
            }}
            margin={"8px 0px 20px 0px"}
            p={"9px 7px 5px 0"}
          >
            <Text
              color="#CCCCCC"
              textAlign="center"
              fontSize="18px"
              fontFamily={"Aileron"}
              fontWeight={"400"}
              lineHeight={"23PX"}
              letterSpacing={"11.72%"}
            >
              Local Meeting
            </Text>
          </Box>
          <InfoList
            data={[
              {
                label: "0-2 Hours",
                value: `${model.prices?.[0]?.incall_2h} ${model.currency}`,
              },
              {
                label: "Up to 3 Hours",
                value: `${model.prices?.[0]?.incall_3h} ${model.currency}`,
              },
              {
                label: "Up to 6 Hours",
                value: `${model.prices?.[0]?.incall_6h} ${model.currency}`,
              },
              {
                label: "Overnight",
                value: `${model.prices?.[0]?.overnight} ${model.currency}`,
              },
            ]}
          />

          {/* International Meeting */}
          <Box
            borderBottom="1px solid transparent"
            sx={{
              borderImageSource:
                "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
              borderImageSlice: 1,
              borderImageWidth: 1,
              borderImageOutset: 0,
              borderImageRepeat: "stretch",
            }}
            margin={"8px 0px 20px 0px"}
            p={"9px 7px 5px 0"}
          >
            <Text
              color="#CCCCCC"
              textAlign="center"
              fontSize="18px"
              fontFamily={"Aileron"}
              fontWeight={"400"}
              lineHeight={"23PX"}
              letterSpacing={"11.72%"}
            >
              International Meeting
            </Text>
          </Box>
          <InfoList
            data={[
              {
                label: "Up to 24 Hours",
                value: `${model.prices?.[0]?.international_24h} ${model.currency}`,
              },
              {
                label: "Up to 48 Hours",
                value: `${model.prices?.[0]?.international_48h} ${model.currency}`,
              },
              {
                label: "Additional Each Day",
                value: `${model.prices?.[0]?.additional_day} ${model.currency}`,
              },
            ]}
          />

          {/* Action Button */}
          <Box mt={"48px"}>
            <Text
              color="#CCCCCC"
              textAlign="center"
              fontSize="18px"
              fontFamily={"Aileron"}
              fontWeight={"400"}
              lineHeight={"23PX"}
              letterSpacing={"11.72%"}
            >
              For Bookings
            </Text>
            <Button
              outline="none"
              border="3px solid #4d4d4d"
              color="#cccccc"
              px="30px"
              py="12px"
              borderRadius="15px"
              transition="all 0.3s ease"
              fontWeight="400"
              letterSpacing="1px"
              mt={"12px"}
              w={"100%"}
              fontSize="16px"
              position="relative"
              overflow="hidden"
              display="inline-flex"
              alignItems="center"
              bg="transparent"
              _hover={{ bg: "#111", borderColor: "#5a5a5a" }}
              h={"60px"}
              gap={"16px"}
              onClick={() =>
                window.open(`https://wa.me/${model.whatsapp}`, "_blank")
              }
            >
              Whatsapp Now
              <Image
                src="/Whatsapp _Icon_White.svg"
                alt="whatsap"
                w={"24px"}
              />
            </Button>
          </Box>
        </Box>
      </Flex>

      {/* Gallery Section */}
      {model.gallery && model.gallery.length > 0 && (
        <Box mt={16} maxW="1300px" mx="auto">
          <Text
            w={"100%"}
            p={"16px"}
            fontSize="20px"
            fontWeight="semibold"
            mb={8}
            textAlign="center"
            borderBottom="1px solid #444"
            display="inline-block"
            px={6}
          >
            Model Gallery
          </Text>

          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={6}
          >
            {model.gallery.map((m, i) => (
              <VStack key={i} spacing={2} align="center">
                <Image
                  src={m.image}
                  alt={m.name}
                  w="100%"
                  h="400px"
                  objectFit="cover"
                  borderRadius="md"
                  objectPosition={"top"}
                />
                <HStack
                  spacing={2}
                  justifyContent="space-between"
                  w={"100%"}
                  fontSize="18px"
                >
                  <Text fontWeight="500">{m.name}</Text>
                  <Text color="gray.400">{m.city}</Text>
                </HStack>
              </VStack>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
