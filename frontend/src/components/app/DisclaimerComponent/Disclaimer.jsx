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
} from "@chakra-ui/react";
import Footer from "../../core/Footer/Footer";

const Disclaimer = () => {
  const policyData = [
    {
      content: [
        `The information provided by Bunny Models (“we,” “us” or “our”) on www.bunnymodels.com (the “Site”) is for general informational purposes only. Although all information on the Site is provided in good faith, we make no representations or warranties, either express or implied, as to its accuracy, sufficiency, legality, reliability, availability, or completeness.`,
        `Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.`,
      ],
    },
    {
      title: "External Links Disclaimer",
      content: [
        `Links to websites and features in banners and other advertisements as well as content from or belonging to third parties may be found on the Site or may be sent to you through the Site. We do not monitor, investigate, or check these external links for truthfulness, sufficiency, validity, dependability, availability, or completeness. `,
        "We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.",
      ],
    },
    {
      title: "Affiliates Disclaimer",
      content: [
        `The Site may contain links to affiliate websites, and we receive an affiliate commission for any purchases made by you on the affiliate website using such links`,
      ],
    },
  ];

  return (
    <Box bg="#000" color="white"  pt="48px">
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
          fontFamily="sfPro"
          color="#818181"
          borderBottom={"1px solid rgb(129 129 129 / 30%)"}
          mb="20px"
        >
          Disclaimer
        </Heading>
        <Box mx={{ base: "3px", md: "14px", lg: "36px" }}>
          {/* Policy Sections (Dynamic) */}
          {policyData.map((section, index) => (
            <Box mb={{ base: "20px", lg: "50px" }} key={index}>
              {section.title && (
                <Heading
                  as="h3"
                  fontSize="16px"
                  mt={{ base: "20px", lg: "50px" }}
                  mb={"16px"}
                  fontWeight="400"
                  fontFamily="sfPro"
                  color={"#818181"}
                  letterSpacing={"1.12px"}
                  textAlign="center"
                >
                  {section.title}
                </Heading>
              )}

              {section.content.map((item, idx) =>
                typeof item === "string" ? (
                  <Text
                    key={idx}
                    fontSize="14px"
                    color="#818181"
                    mb={idx !== section.content.length - 1 ? 6 : 0}
                    fontFamily="sfPro"
                    textAlign={"justify"}
                    letterSpacing={"1.12px"}
                    lineHeight={"22px"}
                    mt={"2px"}
                  >
                    {item}
                  </Text>
                ) : (
                  item.list && (
                    <UnorderedList
                      key={idx}
                      spacing={2}
                      color="#818181"
                      fontSize="sm"
                      display="inline-block"
                      fontFamily="sfPro"
                      mb="30px"
                      textAlign={"justify"}
                      pl={"21px"}
                    >
                      {item.list.map((point, pointIdx) => (
                        <ListItem key={pointIdx}>{point}</ListItem>
                      ))}
                    </UnorderedList>
                  )
                )
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Disclaimer;
