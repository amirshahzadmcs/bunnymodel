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


const PrivacyPolicy = () => {
  const policyData = [
    {
      title: "1. Principles of Data Processing",
      content: [
        `The protection of personal data is a top priority for Bunny Models AG ("Company"). This Policy outlines how we collect, process, and use your data in compliance with the UK Data Protection Act 2018 and UK GDPR.`,
        `We collect and process only the data necessary to provide services, with your consent, and in good faith.`,
      ],
    },
    {
      title: "2. Data Security",
      content: [
        `We implement technical and organizational safeguards to protect your personal data from loss, theft, unauthorized access, disclosure, alteration, or destruction.`,
      ],
    },
    {
      title: "3. Data Sharing & Disclosure",
      content: [
        `We do not sell, rent, or trade personal data with third parties for commercial purposes. Data is disclosed only as required by law or judicial order.`,
      ],
    },
    {
      title: "4. Third-Party Websites",
      content: [
        `Our Website may link to external third-party sites. We are not responsible for their data handling or privacy practices.`,
      ],
    },
    {
      title: "5. User Rights",
      content: [
        `You have the right to:`,
        {
          list: [
            "Withdraw consent at any time.",
            "Access, rectify, or erase your personal data.",
            "Restrict or object to processing.",
            "Request data portability (where applicable).",
          ],
        },
        `Requests should be directed to the Company’s Data Protection Officer.`,
      ],
    },
    {
      title: "6. Age Restriction & Data of Minors",
      content: [
        `We do not knowingly collect or process personal data from anyone under 18 years of age. If such data is inadvertently collected, it will be deleted immediately.`,
      ],
    },
    {
      title: "7. Acceptance of Practices",
      content: [
        `By using this Website, you consent to the practices described in this Policy. If you disagree, you must not use this Website.`,
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
          Privacy Policy
        </Heading>
        <Box mx={{ base: "3px", md: "14px", lg: "36px" }}>
          {/* Policy Sections (Dynamic) */}
          {policyData.map((section, index) => (
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
                    textAlign={"justify"}
                    letterSpacing={"1.12px"}
                    lineHeight={"22px"}
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

export default PrivacyPolicy;
