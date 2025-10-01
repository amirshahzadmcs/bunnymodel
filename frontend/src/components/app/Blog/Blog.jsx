import {
  Box,
  Container,
  Text,
  Heading,
  Link,
  VStack,
  HStack,
  Button,
  Divider,
  Flex,
} from "@chakra-ui/react";

const blogPosts = [
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    content:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client. Analyse the online escort portals properly before your final booking. You can specify your choice and requirement about t ...",
  },
  {
    title: "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    content:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or you are shy and do not want to screw it up from the beginning. That's why knowing the rules of conduct is essential when dating a professional escort model. If you want to make your first date memorable, try to behave correctly with the escort. You can take the help of several online portals for this purpose. Do not be afraid of not looking like a top model ...",
  },
  {
    title: "Ways to Get a Delightful Dating Experience With High-Class Escort Models in Switzerland",
    content:
      "Dating is a stage of a romantic relationship in which two-person people engage in an activity together to understand each other stability as a partner for an intimate relationship. When you date an escort, you must be mentally prepared to give her proper respect to get immense happiness from the escort model. You have to be conscious about your behaviour while dealing with her. Dating is most often colloquially used to refer to the action of individuals. Romantic ...",
  },
  {
    title: "5 Common Dating Mistakes With Models That You Need To Avoid In Germany",
    content:
      "Going on a first date is always kind of awkward. There are those moments of silence where you are trying to find something to bond over. All those questions you have to answer about your life to get to know each other are awkward for everyone, but it is especially tricky when you are an escort. You cannot achieve your ultimate desire of high-class escort without following these steps. Helpful dating tips can help a gentleman significantly. As an escort, you can d ...",
  },
];

export default function Home() {
  return (
    <Box>
      {/* Blog Section */}
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
        {/* Title */}
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
            mb={"12px"}
            position="relative"
            letterSpacing={"2px"}
          >
            Blog
          </Heading>
        </Box>

        <VStack align="stretch" spacing={0}>
          {blogPosts.map((post, idx) => (
            <Box key={idx}
            pb={'40px'}
            mb={'30px'}
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
                fontSize="16px"
                lineHeight="16px"
                fontWeight="400"
                color="#808080"
                fontFamily="Aileron"
                textAlign="left"
                mb="10px"
                position="relative"
                letterSpacing="2px"
              >
                {post.title}
              </Heading>
              <Text
                fontSize="14px"
                lineHeight="22px"
                fontWeight="300"
                color="#808080"
                fontFamily="Aileron"
                textAlign="left"
               
                position="relative"
                letterSpacing="2px"
              >
                {post.content}
                <Link
                  as="span"
                  fontSize="14px"
                  color="#4d4d4d"
                  fontFamily="Aileron"
                  LinkAlign="left"
                 ml={'3px'}
                  position="relative"
                  letterSpacing="2px"
                  _hover={{ textDecoration: "none" }}
                >
                  Readmore
                </Link>
              </Text>
              
            </Box>
          ))}
        </VStack>

        {/* Pagination */}
        <Box mb={'15px'}>
        <HStack justify="center" gap={'15px'} py={'15px'}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              
              variant={num === 2 ? "solid" : "outline"}
              colorScheme="#787878"
              
              fontSize="14px"
              lineHeight="16px"
              fontWeight="600"
              color="#808080"
              fontFamily="Aileron"
              textAlign="center"
              w={'36px'}
              h={'36px'}
              borderRadius="4px"
              _hover={{ bg: "#c7c7c7", color: "#0D0D0D" }}
            >
              {num}
            </Button>
          ))}
        </HStack>
        </Box>
        
      </Container>

      {/* Footer */}
    </Box>
  );
}
