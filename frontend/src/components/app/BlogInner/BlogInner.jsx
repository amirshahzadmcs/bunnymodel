import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Divider,
  Flex,
  HStack,
  Link,
} from "@chakra-ui/react";

export default function BlogDetail() {
  return (
    <Box>
      {/* Blog Content */}
      <Container
        maxW={{
          base: "100%",
          lg: "960px",
          xl: "960px",
          xxl: "1300px",
          xxxl: "1671.74px",
        }}
        pt={"50px"}
        px={"20px"}
      >
        <Box
          mb={"48px"}
          borderBottom="1px solid transparent"
          sx={{
            borderImageSource:
              "linear-gradient(90deg, #ffffff00, rgb(248 248 248 / 58%) 50%, #ffffff00)",
            borderImageSlice: 1,
            borderImageWidth: 1,
            borderImageOutset: 0,
            borderImageRepeat: "stretch",
          }}
        >
          <Heading
            as="h1"
            fontSize="18px"
            lineHeight={"28px"}
            fontWeight="400"
            color=" #cccccc;"
            fontFamily="Aileron"
            textAlign={"center"}
            mb={"10px"}
            position="relative"
            letterSpacing={"2px"}
          >
            Methods That Will Help You to Choose Luxurious Models through a
            Trusted Escort Agency in Germany
          </Heading>
        </Box>
        <VStack align="stretch" spacing={8}>
          {/* Title */}

          {/* Blog Sections */}
          <Text
           fontSize="18px"
           lineHeight="30px"
           fontWeight="300"
           color="#808080"
           fontFamily="Aileron"
           textAlign="left"
          
           position="relative"
           letterSpacing="2px"
          >
            The first step towards experiencing intimacy with a gorgeous escort
            is to find an agency you can trust. Testimonials of previous
            customers back high-end escorting services. They present regulations
            for the business that should be followed for the safety and the
            comfort of both the escort and the client. Analyse the online escort
            portals properly before your final booking. You can specify your
            choice and requirement about the escort through the trusted escort
            agency. It will help you to choose the best escort service.
          </Text>

          <Text fontSize="sm" color="gray.300">
            Indulge in relaxation and comfort with our knowledgeable and
            attentive women who are experts in the art of helping you relax...
          </Text>

          {/* Subsection */}
          <Heading as="h3" size="md" fontWeight="500" mt={6}>
            Transform Your Desires into Reality: Exclusive Encounters in Queens
          </Heading>
          <Text fontSize="sm" color="gray.300">
            Dreams can inspire and ignite our deepest desires. At Bunny Models
            Escorts in Queens, we believe in turning those dreams into
            unforgettable experiences...
          </Text>

          {/* Another Subsection */}
          <Heading as="h3" size="md" fontWeight="500" mt={6}>
            Enchanting Beauty of Queens - Scenic Spots to Explore with Your
            Elite Companion
          </Heading>
          <Text fontSize="sm" color="gray.300">
            A vibrant borough of New York City, Queens is a treasure trove of
            breathtaking scenery, iconic landmarks and cultural wonders...
          </Text>

          {/* Example List Section */}
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="gray.300">
              ✧ Flushing Meadows–Corona Park. One of the largest parks in
              Queens, Flushing Meadows–Corona Park boasts lush greenery,
              tranquil lakes and stunning architecture...
            </Text>
            <Text fontSize="sm" color="gray.300">
              ✧ Gantry Plaza State Park. Located along the East Riverfront in
              Long Island City, Gantry Plaza State Park offers spectacular views
              of the Manhattan skyline...
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
