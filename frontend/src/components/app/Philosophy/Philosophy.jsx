import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { memo } from "react";

// Static content and style objects extracted to avoid re-creation on renders
const BORDER_SX = {
  borderImageSource:
    "linear-gradient(90deg, #ffffff00 0%, rgba(248, 248, 248, 0.58) 50%, #ffffff00 100%)",
  borderImageSlice: 1,
  borderImageWidth: 1,
  borderImageOutset: 0,
  
};

const CONTAINER_PROPS = {
  maxW: "1671.74px",
  width: "100%",
  px: { base: "20px", md: "30px" },
  py: { base: 8, md: 12, lg: 16 },
};

const PARAGRAPH_PROPS = {
  fontSize: { base: "13px", md: "14px", lg: "16px" },
  fontWeight: 300,
  textAlign: { base: "left", md: "justify" },
  letterSpacing: { base: "0.4px", md: "1px", lg: "1.2px" },
  color: "#808080",
  lineHeight: { base: "20px", md: "22px", lg: "26px" },
};

const PARAGRAPHS = [
  "Bunny Models is an international organization led by a team of experienced professionals in the luxury companionship industry. We provide a meticulously curated and trained roster of companions, ready to offer discreet and unforgettable experiences globally. Our commitment is to deliver an unparalleled, personalized service that is precisely tailored to your specific needs.",
  "Our dedicated concierge team is available 24/7 to assist with any request. We are distinguished by our commitment to building and maintaining a roster of elite companions across various locations. Every individual we work with has passed a rigorous screening and training program and is continuously evaluated to ensure the highest standards of client satisfaction.",
  "Our companions can accompany you anywhere in the world. We specialize in serving high-profile individuals who require absolute discretion and confidentiality in all communications and arrangements. Our stringent privacy policy guarantees that all personal and financial information is handled with the utmost security, and client identities are never disclosed to third parties.",
  "To uphold our high standards, all companions undergo a comprehensive security check and must meet strict criteria for acceptance. Once accepted, they receive intensive training in all aspects of their profession, including communication, etiquette, grooming, and client engagement, to ensure a premium experience.",
  "Due to our exacting standards, we accept only a small percentage of applicants. Candidates must possess exceptional natural beauty, a sophisticated demeanor, and a passionate, engaging personality without exception.",
  'Many agencies use misleading profiles and photos to create a false impression of quality. Others may attempt to appear high-class or offer a "courtesan" service, but often provide a basic service disguised with a veneer of elegance. Our clients, who have experience with these services, understand the difference.',
];

function PhilosophyBase() {
  return (
    <Box bg="black">
      <Head>
        <title>Bunny Models — Philosophy</title>
      </Head>

      <Container {...CONTAINER_PROPS}>
        <Box
          mb={{ base: 6, md: '20px' }}
          borderBottom="1px solid transparent"
          sx={BORDER_SX}
        >
          <Heading
            as="h1"
            fontSize={{ base: "18px", md: "24px", lg: "28px" }}
            lineHeight={{ base: "26px", md: "32px", lg: "36px" }}
            fontWeight="400"
            color="#cccccc"
            fontFamily="Aileron, sans-serif"
            letterSpacing={{ base: "0.6px", md: "0.8px", lg: "1px" }}
            textAlign="center"
            mb={{ base: "8px", md: "10px" }}
          >
            Our Philosophy
          </Heading>
        </Box>

        <VStack
          align="stretch"
          gap={{ base: 5, md: '26px' }}
          fontFamily="Aileron, sans-serif"
          maxW={{ base: "100%", lg: "960px",xl:'960px' , xxl: "1300px" ,xxxl:"1671.74px"}}
          mx="auto"
          wordBreak="break-word"
        >
          {PARAGRAPHS.map((paragraph, index) => (
            <Text key={index} {...PARAGRAPH_PROPS}>
              {paragraph}
            </Text>
          ))}
        </VStack>
      </Container>
    </Box>
  );
}

const Philosophy = memo(PhilosophyBase);
export default Philosophy;
