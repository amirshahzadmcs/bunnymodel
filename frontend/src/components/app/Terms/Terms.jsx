import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
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
  px: { base: "24px", md: "16px" },
  py: { base: 8, md: 12 },
};

const PARAGRAPH_PROPS = {
  fontSize: "14px",
  fontWeight: 300,
  textAlign: "justify",
  letterSpacing: "2px",
  color: "#808080",
  lineHeight: "22px",
};

function Section({ number, title, children }) {
  return (
    <VStack align="stretch" spacing={3}>
      <Heading
        as="h2"
        fontSize="16px"
        lineHeight="22px"
        fontWeight="400"
        color="#808080"
        fontFamily="Aileron, sans-serif"
        textAlign="center"
        mt={{ base: 6, md: 8 }}
      >
        {number}. {title}
      </Heading>
      <VStack align="stretch" spacing={3}>
        {children}
      </VStack>
    </VStack>
  );
}

function TermsBase() {
  return (
    <Box>
      <Head>
        <title>Bunny Models — Terms & Condition</title>
      </Head>

      <Container {...CONTAINER_PROPS}>
        <Box
          mb={{ base: 6, md: "20px" }}
          borderBottom="1px solid transparent"
          sx={BORDER_SX}
        >
          <Heading
            as="h1"
            fontSize="18px"
            lineHeight="28px"
            fontWeight="400"
            color="#cccccc"
            fontFamily="Aileron, sans-serif"
            letterSpacing="1.12px"
            textAlign="center"
            mb="10px"
          >
            Terms And Conditions Of Use
          </Heading>
        </Box>

        <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
          <Section number={1} title="Terms of Agreement">
            <Text {...PARAGRAPH_PROPS}>
              By accessing and using the website located at www.bunnymodels.com
              (the "Website"), you acknowledge and agree that your access and
              use are conditioned upon your acceptance of and compliance with
              these Terms of Service, all applicable laws, and relevant
              regulations. Your continued use of this Website constitutes a
              legally binding agreement to be bound by these terms. If you do
              not agree with any of these terms, you are prohibited from using
              or accessing this Website. The content and intellectual property
              on this Website are protected by applicable copyright and
              trademark laws.
            </Text>
          </Section>

          <Section number={2} title="Limited Use License">
            <Text {...PARAGRAPH_PROPS}>
              Bunny Models hereby grants you a limited, non-exclusive,
              non-transferable, and revocable license to temporarily download a
              single copy of the materials (information or software) from the
              Website for personal, non-commercial, and temporary viewing only.
              This license is not a transfer of title, and under this license,
              you are strictly prohibited from:
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              ↳ Modifying or copying the materials (including any commercial use
              or any public display).
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              ↳ Attempting to decompile, reverse engineer, or otherwise alter
              any software contained on the Website.
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              ↳ Removing any copyright, trademark, or other proprietary
              notations from the materials.
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              ↳ Transferring the materials to another person or "mirroring" the
              materials on any other server.
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              This license shall automatically terminate upon any breach of
              these restrictions and may be terminated by Bunny Models at any
              time, at its sole discretion. Upon termination of your viewing
              rights or the termination of this license, you must immediately
              destroy any downloaded materials in your possession, whether in
              electronic or printed format.
            </Text>
          </Section>

          <Section number={3} title="Disclaimer of Warranties">
            <Text {...PARAGRAPH_PROPS}>
              The materials on the Bunny Models Website are provided on an "as
              is" and "as available" basis without any warranties of any kind,
              whether express or implied. Bunny Models hereby disclaims all
              other warranties, including, but not limited to, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              rights or other violations of rights.
            </Text>
            <Text {...PARAGRAPH_PROPS}>
              Furthermore, Bunny Models does not warrant or make any
              representations regarding the accuracy, timeliness, likely
              results, or reliability of the use of the materials on its Website
              or otherwise relating to such materials or on any third-party
              websites linked to this site.
            </Text>
          </Section>

          <Section number={4} title="Limitation of Liability">
            <Text {...PARAGRAPH_PROPS}>
              In no event shall Bunny Models or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on the Website, even if Bunny
              Models or an authorized representative has been notified, orally
              or in writing, of the possibility of such damages. This limitation
              of liability applies to the fullest extent permitted by law.
              Because some jurisdictions do not allow limitations on implied
              warranties, or limitations of liability for consequential or
              incidental damages, these limitations may not apply to you.
            </Text>
          </Section>

          <Section number={5} title="Accuracy of Materials">
            <Text {...PARAGRAPH_PROPS}>
              The materials appearing on the Website may contain technical,
              typographical, or photographic errors. Bunny Models does not
              warrant that any of the materials on its Website are accurate,
              complete, or current. Bunny Models reserves the right to make
              changes to the materials on its Website at any time without notice
              but makes no commitment to update the materials.
            </Text>
          </Section>

          <Section number={6} title="Third-Party Links">
            <Text {...PARAGRAPH_PROPS}>
              Bunny Models has not reviewed all of the third-party websites
              linked to its Website and is not responsible for the contents of
              any such linked site. The inclusion of any link does not imply
              endorsement by Bunny Models of the site. Your use of any such
              linked website is entirely at your own risk.
            </Text>
          </Section>

          <Section number={7} title="Governing Law and Jurisdiction">
            <Text {...PARAGRAPH_PROPS}>
              These Terms of Service shall be governed by and construed in
              accordance with the laws of Switzerland, without regard to its
              conflict of law provisions. Any dispute arising from or related to
              these terms shall be subject to the exclusive jurisdiction of the
              courts located in 12 avenue des Morignes, 1213 Lancy, Switzerland.
              You hereby irrevocably consent to the jurisdiction of said courts.
            </Text>
          </Section>
        </VStack>
      </Container>
    </Box>
  );
}

const Terms = memo(TermsBase);
export default Terms;
