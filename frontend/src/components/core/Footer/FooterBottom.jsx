import { Box, Container, Flex, Link, Image, Text } from "@chakra-ui/react";
import React from "react";

const FooterBottom = () => {
  return (
    <>
      <Box py="30px" borderTop={"1px solid #48486F"} position={"relative"} zIndex={"1"}>
        <Container maxW={"1352px"} mx={"auto"}>
          <Flex justifyContent={"space-between"} flexWrap={"wrap"} alignItems={"center"}>
            <Box width={{md: "55%", base: "100%"}} pr={{lg: "20px", md: "40px"}}>
              <Text
                color={"#8C89A0"}
                letterSpacing={"0.03em"}
                fontSize={{lg: "12px", base: "10px"}}
                lineHeight={{lg: "24px", base: "20px"}}
                fontWeight={"400"}
              >
                © 2022,&nbsp;
                <Link
                  href="#"
                  _hover={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Enoch Limited.&nbsp;
                </Link>
                All rights reserved. PLAY-TO-EARN games and related logos are
                trademarks or registered trademarks of&nbsp;
                <Link
                  href="#"
                  _hover={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Enoch Limited.&nbsp;
                </Link>
                Avatar Labs Magic® is a trademark or registered trademark of{" "}
                <Link
                  href="#"
                  _hover={{ textDecoration: "none", color: "#FFFFFF" }}
                >
                  Enoch Ltd.
                </Link>
                in the United Kingdom and elsewhere. All other copyrights and
                trademarks are the property of their respective owners.
              </Text>
            </Box>

            <Box width={{md: "45%", base: "100%"}} mt={{md: "30px", base: "20px"}}>
              <Flex
                maxW={"417px"}
                width={"100%"}
                justifyContent={"space-between"}
                alignItems={"center"}
                ml={{md: "auto"}}
              >
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/tiktok.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/instagram.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/github.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/discord.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/raddit.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/twiter.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/comment.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/telegram.svg" alt="icon" />
                </Link>
                <Link
                  href="#"
                  width={{lg: "auto", sm: "18px", base: "16px"}}
                  _hover={{ textDecoration: "none", opacity: "0.6" }}
                >
                  <Image src="image/footer/m.svg" alt="icon" />
                </Link>
              </Flex>
              <Flex 
                color={"#8C89A0"}
                letterSpacing={"0.03em"}
                fontSize={{lg: "13px", base: "10px"}}
                lineHeight={"18.3px"}
                fontWeight={"400"}
                maxW={"417px"}
                width={"100%"}
                justifyContent={{md: "space-between", base: "flex-start"}}
                alignItems={"center"}
                ml={{md: "auto"}}
                mt={"16px"}
                flexWrap={"wrap"}
                gap={{md: "0px", base: "10px"}}
                >
                <Link href="#" _hover={{textDecoration: "none", color: "#FFFFFF"}}>Legal Disclaimer</Link>
                <Link href="#" _hover={{textDecoration: "none", color: "#FFFFFF"}}>Cookies & Privacy Policy</Link>
                <Link href="#" _hover={{textDecoration: "none", color: "#FFFFFF"}}>Copyright Policy</Link>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default FooterBottom;
