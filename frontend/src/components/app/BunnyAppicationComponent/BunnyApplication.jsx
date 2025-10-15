import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Container,
  Divider,
  Flex,
  Link,
  Image,
  keyframes 
} from "@chakra-ui/react";
import Footer from "../../core/Footer/Footer";
const rotate = keyframes`
  to { transform: rotate(360deg); }
`;
const BunnyApplication = () => {


  return (
    <Box bg="#000" color="white" minH="100vh" pt="48px">
        <Container maxW="1671.74px" px={"12px"} mb="32px">
          {/* Page Title */}
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
            fontFamily="'Aileron', sans-serif"
            color="#818181"
            borderBottom={"1px solid rgb(129 129 129 / 30%)"}
            mx={{md:"14px",lg:"0"}}
          >
            Welcome
          </Heading>
            <Box mx={{base:"3px",md:"14px",lg:"36px"}}>
                <Box 
                      fontSize="14px"
                      color="#818181"
                      fontFamily="'Aileron', sans-serif"
                      textAlign="justify"
                      letterSpacing="2px"
                      lineHeight="22px">
                    <Text
                      
                      sx={{ textIndent: "50px" }}
                      my="24px"
                    >
                      Thank you for considering us in your search for elite representation as a
                      sophisticated and caring companion. We serve a discerning clientele and look
                      forward to meeting accomplished women who challenge and inspire them. Our
                      community includes educated models, amicable actresses, successful
                      professionals, and other exceptional individuals. While personality is a
                      crucial part of your success, extraordinary physical beauty is a fundamental
                      requirement.
                  </Text>
                  <Text>Bunny Models is a luxury companion agency that provides compassionate, well-mannered, and refined women to our accomplished and selective clients for temporary companionship, such as engaging dinner dates and attentive travel partners. We collaborate with a select group of luxury companions who offer both intellectual depth and remarkable beauty.</Text>
              </Box>
              <Box>
                <Heading
                  as="h3"
                  fontSize="16px"
                  mt={"24px"}
                  mb={"16px"}
                  fontWeight="400"
                  fontFamily="'Aileron', sans-serif"
                  color={"#818181"}
                  letterSpacing={"2px"}
                  textAlign="center" 
                >
                  What We Offer

                </Heading>
                <Text
                  fontSize="14px"
                  color="#818181"
                  fontFamily="'Aileron', sans-serif"
                  textAlign="justify"
                  letterSpacing="2px"
                  lineHeight="22px"
                >
                  Bunny Models offers intelligent, successful, and attractive women a unique opportunity to supplement their income with a part-time, luxurious position as an elite, VIP companion. Enjoy excellent compensation for your time while meeting fascinating and attractive people. Once accepted, you have full control over your availability and the clients you choose to meet. You are never obligated to go anywhere or meet anyone you are not comfortable with. We operate as a partnership, not an employer-employee relationship. There is no pressure to accept any booking, as another companion will gladly take your place if you are unavailable.
              </Text>
              <Text
                  fontSize="14px"
                  color="#818181"
                  fontFamily="'Aileron', sans-serif"
                  textAlign="justify"
                  letterSpacing="2px"
                  lineHeight="22px"
                  mt="24px"
                >
  This glamorous and rewarding lifestyle can be yours by working with one of the most prestigious, premium VIP dinner and travel companion agencies in the world. Please click the "Join" button below to start your application.

              </Text>
              </Box>

            </Box>
             <Flex justifyContent={"center"} mt="48px" mb="24px">
              <Link href="/contact-us">
                <Box
                    as="button"
                    position="relative"
                    display="inline-flex"
                    alignItems="center"
                    gap="0.5rem"
                    padding="1rem 3rem"
                    fontFamily="'Aileron', sans-serif"
                    fontSize="16px"
                    fontWeight="400"
                    color="#fff"
                    textTransform={"uppercase"}
                    borderRadius="20px"
                    w={"163px"}
                    border="0px"
                    background="rgba(255,255,255,0.05)"
                    backdropFilter="blur(8px)"
                    cursor="pointer"
                    // overflow="hidden"
                    transition="all 0.3s ease"
                    
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#191919",
                      borderRadius: "20px",
                      boxShadow: "0 0 0 1px #ffffff40",
                      transition: "all 0.3s ease-in-out",
                      zIndex: 0,
                    }}
                    _after={{
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "radial-gradient(at 51% 89%, hsl(0 0% 92.13% / 25%) 0px, transparent 50%), radial-gradient(at 100% 100%, hsl(0 0% 100% / 31%) 0px, transparent 50%), radial-gradient(at 22% 91%, hsl(0 0% 100% / 9%) 0px, transparent 50%)",
                      borderRadius: "20px",
                      transition: "all 0.3s ease-in-out",
                      zIndex: 2,
                    }}
                  _hover={{
                    _after: { backgroundColor: "hsl(0deg 0% 100% / 12%)" }
                  }}
                  >
                    <Text position="relative" zIndex={3}>
                      Join Us
                    </Text>

                    {/* Dots border effect */}
                    <Box
                      className="dots_border"
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      width="calc(100% + 2px)"
                      height="calc(100% + 2px)"
                      borderRadius="20px"
                      overflow="hidden"
                      zIndex={-10}
                    >
                      <Box
                        position="absolute"
                        top="30%"
                        left="50%"
                        width="100%"
                        height="2rem"
                        backgroundColor="white"
                        sx={{
                          mask:"linear-gradient(transparent 0%, white 120%)"
                        }}
                        transformOrigin="left"
                        animation={`${rotate} 2s linear infinite`}
                      />
                    </Box>
                </Box>
              </Link>
              </Flex>
        </Container>
      </Box>
  );
};

export default BunnyApplication;
