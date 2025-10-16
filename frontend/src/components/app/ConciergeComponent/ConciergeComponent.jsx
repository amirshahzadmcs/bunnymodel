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

const ConciergeComponent = () => {
  const policyData = [
    {
      title: "1. Principles of Data Processing",
      content: [
        `At Bunny Models Management, our commitment extends beyond representation. We offer a discreet, highly personalized concierge service designed exclusively for our clients and models.`,
        `Our concierge team ensures that every detail is handled with the utmost privacy, confidentiality, and discretion — values at the heart of our philosophy. Whether it’s supporting professional commitments or personal needs, we provide seamless solutions tailored to your lifestyle.`,
      ],
    },

    {
      title: "Tailored Services Include:",
      content: [
        {
          list: [
            "Travel & Accommodation – private arrangements for flights, hotels, and bespoke experiences.",
            "Luxury Cars & Chauffeurs – discreet and reliable transport for every occasion.",
            "Studios, Spaces & Locations – curated places for photo shoots, events, or private use.",
            "Wellness & Medical Labs – access to trusted, confidential health and beauty services.",
            "Photography & Production – premium creative support, delivered with professionalism.",
            "Special Requests – whatever you need, whenever you need it.",
          ],
        },
        `Our role is to ensure peace of mind, comfort, and absolute confidence in knowing that everything is taken care of.`,
      ],
    },

  ];

  return (
    <>
        <Box bg="#000" color="white"  pt="32px">
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
            Concierge
          </Heading>
            <Box mx={{base:"3px",md:"14px",lg:"36px"}}>
          {/* Policy Sections (Dynamic) */}
          {policyData.map((section, index) => (
            <Box mb={{base:"20px",lg:"50px"}} key={index}>
              <Heading
                as="h3"
                fontSize="16px"
                mt={{base:"20px",lg:"50px"}}
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
                      letterSpacing={"2px"}
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
      </>
  );
};

export default ConciergeComponent;
