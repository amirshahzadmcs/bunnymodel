import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  VStack,
  HStack,
  Button,
  Divider,
  Icon,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosClient from "../../../utils/axiosClient";
import ApiImage from "../Apiimage/ApiImage";

const LabelRow = ({ label, value }) => (
  <Flex justifyContent="space-between" alignItems="center" py="10px">
    <Text color="#B3B3B3" fontSize="14px" letterSpacing="0.02em">
      {label}
    </Text>
    <Text color="#E5E5E5" fontSize="14px" letterSpacing="0.02em">
      {value}
    </Text>
  </Flex>
);

const SectionHeading = ({ children }) => (
  <Text
    color="#E5E5E5"
    fontSize="14px"
    textAlign="center"
    py="14px"
    borderTop="1px solid #3A3A3A"
    borderBottom="1px solid #3A3A3A"
  >
    {children}
  </Text>
);

export default function Profile() {
  const router = useRouter();
  const { username } = router.query;
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <Text color="red" fontSize="18px">
          {error}
        </Text>
      </Center>
    );
  }

  if (!model) {
    return (
      <Center minH="100vh">
        <Text color="white" fontSize="18px">
          Model not found
        </Text>
      </Center>
    );
  }

  return (
    <Box  py={{ base: 6, md: "70px" }}>
      <Container maxW="1320px" px={{ base: 4, md: 6 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
          gap={{ base: 6, md: 8 }}
        >
          {/* Left: Hero image + thumbnails */}
          <GridItem>
            <VStack spacing={4} align="stretch">
              <Box>
                <ApiImage
                  src={model.images?.[0]?.image || "P1_01.jpg"}
                  folder="P1"
                  alt={`${model.firstname} ${model.lastname}`}
                  className="w-full h-auto"
                />
              </Box>

              <HStack spacing={4} overflowX="auto" py={2}>
                {model.images?.map((image, idx) => (
                  <Box
                    key={idx}
                    minW={{ base: "22%", md: "18%" }}
                    border="1px solid #2A2A2A"
                    bg="#0E0E0E"
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
            </VStack>
          </GridItem>

          {/* Right: Specs and pricing */}
          <GridItem>
            <Box>
              {/* Top name */}
              <Text
                color="#CCCCCC"
                textAlign="center"
                mb={4}
                fontSize="18px"
                fontFamily={"Aileron"}
                fontWeight={"400"}
                lineHeight={"23PX"}
                letterSpacing={"11.72%"}
                borderBottom="1px solid transparent"
                pb={'10px'}
                sx={{
                  borderImageSource:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
                  borderImageSlice: 1,
                  borderImageWidth: 1,
                  borderImageOutset: 0,
                  borderImageRepeat: "stretch",
                }}
              >
                {model.firstname} {model.lastname}
              </Text>

              <VStack spacing={0} align="stretch">
                {/* Attributes */}
                <LabelRow label="Age" value={model.age} />
                <LabelRow label="Nationality" value={model.nationality} />
                <LabelRow label="Height" value={model.height} />
                <LabelRow label="Weight" value={model.weight} />
                <LabelRow label="Hip" value={model.hip} />
                <LabelRow label="Bust" value={model.bust} />
                <LabelRow label="Waist" value={model.waist} />
                <LabelRow label="Orientation" value={model.orientation} />
                <LabelRow label="City" value={model.city} />
                <LabelRow label="Languages" value={model.languages} />
                

                <Box mt={4}>
                  {/* Top name */}
              <Text
                color="#CCCCCC"
                textAlign="center"
                mb={4}
                fontSize="18px"
                fontFamily={"Aileron"}
                fontWeight={"400"}
                lineHeight={"23PX"}
                letterSpacing={"11.72%"}
                borderBottom="1px solid transparent"
                pb={'10px'}
                sx={{
                  borderImageSource:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
                  borderImageSlice: 1,
                  borderImageWidth: 1,
                  borderImageOutset: 0,
                  borderImageRepeat: "stretch",
                }}
              >
                Local Meeting
              </Text>
                  {model.prices?.map((price, index) => (
                    <div key={index}>
                      <LabelRow label="0-2 Hours" value={`${price.incall_2h} ${model.currency}`} />
                      <LabelRow label="Up to 3 Hours" value={`${price.incall_3h} ${model.currency}`} />
                      <LabelRow label="Up to 6 Hours" value={`${price.incall_6h} ${model.currency}`} />
                      <LabelRow label="Overnight" value={`${price.overnight} ${model.currency}`} />
                    </div>
                  ))}
                </Box>

                <Box mt={4}>
                    {/* Top name */}
              <Text
                color="#CCCCCC"
                textAlign="center"
                mb={4}
                fontSize="18px"
                fontFamily={"Aileron"}
                fontWeight={"400"}
                lineHeight={"23PX"}
                letterSpacing={"11.72%"}
                borderBottom="1px solid transparent"
                pb={'10px'}
                sx={{
                  borderImageSource:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 0%, rgba(153, 153, 153, 0.5) 49.04%, rgba(0, 0, 0, 0.5) 99.99%)",
                  borderImageSlice: 1,
                  borderImageWidth: 1,
                  borderImageOutset: 0,
                  borderImageRepeat: "stretch",
                }}
              >
               International Meeting
              </Text>
                  {model.prices?.map((price, index) => (
                    <div key={index}>
                      <LabelRow label="Up to 24 Hours" value={`${price.international_24h} ${model.currency}`} />
                      <LabelRow label="Up to 48 Hours" value={`${price.international_48h} ${model.currency}`} />
                      <LabelRow label="Additional Each Day" value={`${price.additional_day} ${model.currency}`} />
                    </div>
                  ))}
                </Box>

                <Box mt={6}>
                  <Text
                    color="#B3B3B3"
                    textAlign="center"
                    fontSize="18px"
                    fontFamily={"Inter"}
                    fontWeight={"400"}
                    lineHeight={"23PX"}
                    letterSpacing={"11.72%"}
                    
                    pb={'10px'}
                    
                  >
                    For Bookings
                  </Text>
                  <Button
                    width="100%"
                    bg="transparent"
                    border="3px solid #4D4D4D"
                    color="#CCCCCC"
                    fontFamily={'Inter'}
                    fontSize={'23px'}
                    fontWeight={'400'}
                    lineHeight={'27PX'}
                    letterSpacing={'10.16%'}
                    borderRadius="20px"
                    height="75px"
                    _hover={{ bg: "#111", borderColor: "#5A5A5A" }}
                    rightIcon={<Icon as={FaWhatsapp} />}
                    onClick={() => window.open(`https://wa.me/${model.whatsapp}`, '_blank')}
                  >
                    Whatsapp Now
                  </Button>
                </Box>
              </VStack>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
