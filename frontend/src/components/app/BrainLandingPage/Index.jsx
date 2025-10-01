import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import HomeBanner from "./Banner";import ModelGallery from "../ModelGallery/ModelGallery";
import BannerHome from "../Banner/Banner";
const BrainIndex = () => {
  return (
    <>
      <Box maxW={"100%"} w="100%" mx="auto" position={"relative"}>
      <BannerHome />
        <Box>
          <ModelGallery />
        </Box>
      </Box>
    </>
  );
};

export default BrainIndex;
