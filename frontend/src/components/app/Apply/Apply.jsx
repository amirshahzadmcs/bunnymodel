import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Center,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { memo } from "react";

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
  fontFamily: "Aileron, sans-serif",
};

function ApplyBase() {
  return (
    <Box bg="black">
      <Head>
        <title>Bunny Models — Apply</title>
      </Head>

      <Container {...CONTAINER_PROPS}>
        <Box
          mb={{ base: 6, md: "20px" }}
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
            Welcome to Our Exclusive Companion Agency
          </Heading>
        </Box>

        <VStack
          align="stretch"
          gap={{ base: 5, md: '26px' }}
          maxW={{ base: "100%", lg: "960px",xl:'960px' , xxl: "1300px" ,xxxl:"1671.74px"}}
          mx="auto"
        >
          <Text {...PARAGRAPH_PROPS}>
            Thank you for considering us in your search for elite representation
            as a sophisticated and caring companion. We serve a discerning
            clientele and look forward to meeting accomplished women who
            challenge and inspire them. Our community includes educated models,
            amicable actresses, successful professionals, and other exceptional
            individuals. While personality is a crucial part of your success,
            extraordinary physical beauty is a fundamental requirement.
          </Text>
          <Text {...PARAGRAPH_PROPS}>
            Bunny Model is a luxury companion agency that provides
            compassionate, well-mannered, and refined women to our accomplished
            and selective clients for temporary companionship, such as engaging
            dinner dates and attentive travel partners. We collaborate with a
            select group of luxury companions who offer both intellectual depth
            and remarkable beauty.
          </Text>

          <Box
            mb={{ base: 6, md: "12px" }}
            borderBottom="1px solid transparent"
            sx={BORDER_SX}
            mt={{ base: 6, md: "45px" }}
          >
            <Heading
              as="h2"
              fontSize={{ base: "16px", md: "18px", lg: "20px" }}
              lineHeight={{ base: "22px", md: "26px", lg: "28px" }}
              fontWeight="400"
              color="#808080"
              fontFamily="Aileron, sans-serif"
              textAlign="center"
              mb={{ base: "8px", md: "10px" }}
            >
              What We Offer
            </Heading>
          </Box>

          <Text {...PARAGRAPH_PROPS}>
            Bunny Models offers intelligent, successful, and attractive women a
            unique opportunity to supplement their income with a part-time,
            luxurious position as an elite, VIP companion. Enjoy excellent
            compensation for your time while meeting fascinating and attractive
            people. Once accepted, you have full control over your availability
            and the clients you choose to meet. You are never obligated to go
            anywhere or meet anyone you are not comfortable with. We operate as
            a partnership, not an employer–employee relationship. There is no
            pressure to accept any booking, as another companion will gladly
            take your place if you are unavailable.
          </Text>
          <Text {...PARAGRAPH_PROPS}>
            This glamorous and rewarding lifestyle can be yours by working with
            one of the most prestigious, premium VIP dinner and travel companion
            agencies in the world. Please click the "Join" button below to start
            your application.
          </Text>

          <Center py={{ base: 4, md: 6 }}>
            <Button
              bg="transparent"
              color="white"
              position="relative"
              overflow="hidden"
              fontSize="1.1rem"
              fontWeight="400"
              borderRadius="4px"
              px="3rem"
              py="1rem"
              border="1px solid rgba(255, 255, 255, 0.2)"
              textDecoration="none"
              _hover={{ bg: "transparent", boxShadow: "1px 1px 25px 10px rgba(255, 255, 255, 0.5)" }}
             minW={'255px'}
              h={'45px'}
            
              fontFamily="Aileron, sans-serif"
            >
              Join us
            </Button>
          </Center>

          <Text {...PARAGRAPH_PROPS}>
            Your interaction with us is kept 100% confidential at all times. We
            expect similar discretion from you, and a Non-Disclosure Agreement
            will be put in place. We look forward to speaking with you and
            answering all of your questions.
          </Text>
          <VStack align="stretch" spacing={0}>
            <Text {...PARAGRAPH_PROPS}>Have a pleasant day,</Text>
            <Text {...PARAGRAPH_PROPS}>Bunny Models Management</Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

const Apply = memo(ApplyBase);
export default Apply;
