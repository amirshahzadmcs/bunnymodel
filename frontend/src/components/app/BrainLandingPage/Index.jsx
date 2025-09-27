import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import ModelGallery from "../ModelGallery/ModelGallery";

const BrainIndex = () => {
  return (
    <>
      <Box maxW={"100%"} w="100%" mx="auto" position={"relative"}>
        <Box>
          <ModelGallery />
        </Box>
      </Box>
    </>
  );
};

export default BrainIndex;
