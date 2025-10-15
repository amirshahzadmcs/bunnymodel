import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  VStack,
  Divider,
  Link,
  HStack,
  UnorderedList,
  ListItem,
  Flex,
} from "@chakra-ui/react";

export default function FAQPage() {
  const faqData = [
    {
      category: "",
      items: [
        {
          q: "What is Bunny Models?",
          a: (
            <Text>
              Bunny Models is a discreet, high-end escort and companionship
              agency based in London. We specialize in connecting elite clients
              with carefully selected, verified, and professional models for
              exclusive experiences.
            </Text>
          ),
        },
      ],
    },
    {
      category: "For Clients",
      items: [
        {
          q: "How do I book a model?",
          a: (
            <Text>
              Simply browse our private members’ section, choose your preferred
              model, and submit a booking request. Our concierge team will
              confirm availability and finalize the details with you
              confidentially.
            </Text>
          ),
        },
        {
          q: "Are my details kept confidential?",
          a: (
            <Text>
              Yes. Privacy, discretion, and confidentiality are at the core of
              our service. All client information and bookings are handled with
              the highest level of security.
            </Text>
          ),
        },
        {
          q: "What type of clients do you accept?",
          a: (
            <Text>
              Bunny Models caters exclusively to respectful, professional, and
              high-end clientele. Membership and bookings are subject to
              approval.
            </Text>
          ),
        },
        {
          q: "What services do your models provide?",
          a: (
            <Text>
              Each model offers companionship tailored to the client’s needs.
              Specific services are always discussed privately and agreed upon
              between client and model.
            </Text>
          ),
        },
        {
          q: "What is the booking process like?",
          a: (
            <Text>
              Once you submit your request, our team verifies availability,
              confirms the model’s acceptance, and arranges the details
              discreetly. Payment methods and instructions are provided upon
              confirmation.
            </Text>
          ),
        },
        {
          q: "Do you offer international travel bookings?",
          a: (
            <Text>
              Yes. Many of our models are available for travel, both within the
              UK and internationally. All travel arrangements must be agreed
              upon in advance.
            </Text>
          ),
        },
        {
          q: "Do your models undergo regular health and disease testing?",
          a: (
            <Text>
              Absolutely. All Bunny Models undergo strict and regular medical
              check-ups, including comprehensive sexual health screenings, to
              ensure the safety and peace of mind of both clients and models. We
              prioritize health and discretion at the highest level.
            </Text>
          ),
        },
      ],
    },
    {
      category: "For Models",
      items: [
        {
          q: "How can I apply to become a Bunny Model?",
          a: (
            <Text>
              Submit your application through our website. Our recruitment team
              reviews every profile carefully to ensure applicants meet our high
              standards of beauty, professionalism, and discretion.
            </Text>
          ),
        },
        {
          q: "What are the requirements to join?",
          a: (
            <Text>
              Applicants must be 18+, elegant, professional, and confident.
              Prior experience in modeling or escorting is not required but is
              considered an asset.
            </Text>
          ),
        },
        {
          q: "How does Bunny Models ensure safety for models?",
          a: (
            <Text>
              We carefully screen all clients and bookings to ensure models’
              safety. Our team is available 24/7 to support models before,
              during, and after appointments.
            </Text>
          ),
        },
        {
          q: "How much can I earn as a Bunny Model?",
          a: (
            <Text>
              Earnings vary depending on availability, appearance, and client
              preferences. Our models enjoy premium rates reflective of our
              high-end clientele.
            </Text>
          ),
        },
        {
          q: "How are bookings confirmed with models?",
          a: (
            <Text>
              Once a client makes a request, our team confirms details with you
              directly. You will always have the option to accept or decline a
              booking.
            </Text>
          ),
        },
      ],
    },
    {
      category: "General",
      items: [
        {
          q: "Is Bunny Models a legal service?",
          a: (
            <Text>
              Bunny Models operates strictly within the legal framework of
              companionship and modeling services in the UK. Any arrangements
              beyond companionship are at the mutual consent of adults involved.
            </Text>
          ),
        },
        {
          q: "Why should I choose Bunny Models over other agencies?",
          a: (
            <Text>
              We pride ourselves on exclusivity, luxury, and discretion. Our
              models are carefully selected, our clients are respected
              professionals, and our service is tailored for elite experiences
              only.
            </Text>
          ),
        },
        {
          q: "Is there any option to extend my booking during an appointment?",
          a: (
            <Text>
              Yes, You can extend your booking by simply clicking “extend
              booking” option in the tracking page.
            </Text>
          ),
        },
        {
          q: "Are there any options to extend my appointment without payment?",
          a: (
            <Text>
              Yes, if you have the required amount in your Bunny Models wallet,
              you can use your wallet credit to pay for the appointment
              extension.
            </Text>
          ),
        },
        {
          q: "Can I cancel my booking?",
          a: (
            <Text>
              Yes, you can cancel at any time 24 hours before your appointment
              without paying any cancellation fee. Travel expenses may apply.
            </Text>
          ),
        },
        {
          q: "What are the uses of the Bunny Models wallet?",
          a: (
            <Box>
              <Text mb={2}>
                The wallet is created to simplify your transactions:
              </Text>
              <UnorderedList pl={5} spacing={1}>
                <ListItem>You can receive referral income</ListItem>
                <ListItem>
                  Your refunds will automatically credit to your wallet
                </ListItem>
                <ListItem>You can book models with wallet balance</ListItem>
                <ListItem>
                  You can extend your bookings without cash payments if you have
                  enough balance in your wallet
                </ListItem>
              </UnorderedList>
            </Box>
          ),
        },
        {
          q: "Can I transfer my wallet balance?",
          a: (
            <Text>
              Yes, you can transfer your wallet balance at any time to any Bank
              Account, Crypto, PayPal, or Wise account.
            </Text>
          ),
        },
        {
          q: "There was an error, what can I do?",
          a: (
            <Box>
              <UnorderedList pl={5} spacing={1}>
                <ListItem>Refresh the page</ListItem>
                <ListItem>Clear your browser cookies</ListItem>
                <ListItem>Restart your browser</ListItem>
                <ListItem>Restart your device</ListItem>
              </UnorderedList>
              <Text mt={2}>
                If you still have the same issue, please contact our concierge.
              </Text>
            </Box>
          ),
        },
        {
          q: "Can I speak with a company representative when I need any assistance?",
          a: (
            <Text>
              Yes, we have a 24/7 concierge service to assist you with any
              query.
            </Text>
          ),
        },
        {
          q: "How can I contact Bunny Models concierge?",
          a: (
            <Box>
              <Text>You can call us directly at: +44 800 1026910</Text>
              <Text mt="16px">
                Or you can send us an email at: concierge@bunnymodels.com
              </Text>
            </Box>
          ),
        },
      ],
    },
  ];

  return (
    <Box bg="black" minH="100vh" py={10}  maxW="1671.74px" mb="32px" mx={"auto"} px={"12px"}>
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
        mb={"40px"}
        >
          Frequently Asked Questions
        </Heading>
      <VStack spacing={8} align="stretch" maxW="750px" mx="auto">
        

        {faqData.map((section, idx) => (
          <Box key={idx}>
            {section.category && (
              <Text
                textAlign="center"
                color="#808080"
                fontSize="16px"
                mb="16px"
                fontFamily="'Aileron', sans-serif"
              >
                {section.category}
              </Text>
            )}

            <Accordion allowToggle>
              {section.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  border="1px solid rgba(0,0,0,.125)"
                  borderRadius="14px"
                  boxShadow="0 0 0 1.5px #3A3A3A"
                  mb="20px"
                >
                  {({ isExpanded }) => (
                    <>
                      <h2>
                        <AccordionButton
                          _expanded={{ bg: "#0E0E0E" }}
                          px="20px"
                          py="16px"
                          borderRadius="14px 14px 0px 0px"
                          fontWeight="400"
                          fontSize="16px"
                          fontFamily="'Aileron', sans-serif"
                          color="#9B9B9B"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box flex="1" textAlign="left">
                            {item.q}
                          </Box>

                          {/* Custom rotating SVG */}
                          <Box
                            as="span"
                            w="20px"
                            h="20px"
                            ml="8px"
                            backgroundImage={`url("/down-arrow.svg")`}
                            backgroundRepeat="no-repeat"
                            backgroundSize="contain"
                            backgroundPosition="center"
                            transition="transform 0.25s ease, opacity 0.25s ease"
                            transform={
                              isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                            }
                            opacity={isExpanded ? 0.8 : 1}
                          />
                        </AccordionButton>
                      </h2>

                      <AccordionPanel
                        p="16px 20px"
                        bg="#0E0E0E"
                        borderRadius="0px 0px 14px 14px"
                        color="#808080"
                        fontSize="14px"
                        fontFamily="'Aileron', sans-serif"
                      >
                        {item.a}
                      </AccordionPanel>
                    </>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
