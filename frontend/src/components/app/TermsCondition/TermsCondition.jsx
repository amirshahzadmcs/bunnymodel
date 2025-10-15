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

const TermsCondition = () => {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content: [
        `By accessing and using this website (the “Website”), you acknowledge that your access and use are subject to your acceptance of and compliance with these Terms of Service, all applicable laws, and all relevant regulations. By continuing to use this Website, you enter into a legally binding agreement to be bound by these Terms.`,
        `If you do not agree with any of these Terms, you are prohibited from using or accessing this Website. The Website content and intellectual property are protected by applicable copyright, trademark, and intellectual property laws.`,
      ],
    },
    {
      title: "2. Age Restriction (18+ Policy)",
      content: [
        `This Website is strictly for adults aged 18 years and above. By entering and using the Website, you confirm that you are at least 18 years of age (or the age of majority in your jurisdiction, if higher).`,
        `If you are under 18, or if adult content is illegal in your jurisdiction, you must immediately exit and not use this Website.`,
        `The Company reserves the right to suspend or terminate access for any user reasonably suspected of being underage or in violation of this clause.`,
      ],
    },
    {
      title: "3. Limited Use License",
      content: [
        `Bunny Models AG (“Company”) grants you a limited, non-exclusive, non-transferable, and revocable license to temporarily download and view materials (information, profiles, or software) from this Website for personal and non-commercial use only.`,
        `You have the right to:`,
        {
          list: [
            "Modify, copy, or reproduce Website materials.",
            "Use materials for commercial resale or public display.",
            "Attempt to reverse engineer or exploit Website content.",
            "Transfer or “mirror” materials on any other server.",
          ],
        },
        `This license automatically terminates upon violation of these Terms and may be revoked at any time.`,
      ],
    },
    {
      title: "4. Disclaimer of Warranties",
      content: [
        `All materials on the Website are provided “as is” and “as available” without any warranties of any kind, express or implied, including but not limited to implied warranties of merchantability, fitness for purpose, or non-infringement.`,
        "The Company does not warrant uninterrupted access, accuracy of content, or that the Website is free from harmful code.",
      ],
    },

    {
      title: "5. Limitation of Liability",
      content: [
        `To the fullest extent permitted by law, the Company and its affiliates are not liable for any damages (including, without limitation, loss of data, profits, or business interruption) arising from the use or inability to use this Website or its materials.`,
        "Certain jurisdictions may not allow such limitations; in those cases, liability shall be limited to the minimum extent permitted by law.",
      ],
    },
    {
      title: "6. Accuracy of Materials",
      content: [
        `The materials on this Website may include technical, typographical, or photographic errors. The Company does not warrant that any material is accurate, complete, or current and reserves the right to update at any time without notice.`,
      ],
    },
    {
      title: "7. Third-Party Links",
      content: [
        "This Website may contain links to third-party sites. The Company is not responsible for the content or practices of such external sites, and inclusion of such links does not imply endorsement.",
      ],
    },
    {
      title: "8. Copyright and Intellectual Property",
      content: [
        "All Website content, including logos, text, graphics, and photographs, are the property of Bunny Models AG or licensed to it, protected under international copyright and trademark laws. Unauthorized use may result in civil and criminal penalties.",
      ],
    },
    {
      title: "9. Revisions to Terms",
      content: [
        "The Company may revise these Terms at any time without prior notice. By continuing to use the Website, you agree to the latest version.",
      ],
    },
    {
      title: "10. Governing Law & Jurisdiction",
      content: [
        "These Terms shall be governed by the laws of England and Wales. Any dispute shall fall under the exclusive jurisdiction of UK courts.",
      ],
    },
  ];

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
          fontFamily="sfPro"
          color="#818181"
          borderBottom={"1px solid rgb(129 129 129 / 30%)"}
        >
          Terms And Conditions
        </Heading>
        <Box mx={{ base: "3px", md: "14px", lg: "36px" }}>
          {/* Policy Sections (Dynamic) */}
          {termsData.map((section, index) => (
            <Box mb={{ base: "20px", lg: "50px" }} key={index}>
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

              {section.content.map((item, idx) =>
                typeof item === "string" ? (
                  <Text
                    key={idx}
                    fontSize="14px"
                    color="#818181"
                    mb={idx !== section.content.length - 1 ? 2 : 0}
                    fontFamily="sfPro"
                    textAlign={"left"}
                    letterSpacing={"1.12px"}
                    lineHeight={"22px"}
                  >
                    {item}
                  </Text>
                ) : (
                  item.list && (
                    <UnorderedList
                      key={idx}
                      textAlign="left"
                      spacing={2}
                      color="#818181"
                      fontSize="sm"
                      display="inline-block"
                      fontFamily="sfPro"
                      mb="30px"
                      styleType="none"
                    >
                      {item.list.map((point, pointIdx) => (
                        <ListItem
                          key={pointIdx}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <Image
                            src="/bunny-list-icon-white.svg"
                            mr="12px"
                            w={"18px"}
                            alt="list icon"
                          />
                          {point}
                        </ListItem>
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

export default TermsCondition;
