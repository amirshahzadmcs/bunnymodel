import React from "react";
import { Box } from "@chakra-ui/react";

const BASE_URL = "http://localhost:8000";
const IMAGE_PATH = "/modals";

const ApiImage = ({ src, alt = "", className = "", onClick, showHoverEffect = false }) => {
  if (!src) return null;

  // Extract folder prefix before "_"
  const folder = src.split("_")[0]; // e.g., "P16"

  const fullUrl = `${BASE_URL}${IMAGE_PATH}/${folder}/${src}`;

  if (showHoverEffect) {
    return (
      <Box
        position="relative"
        overflow="hidden"
        role="group"
        cursor="pointer"
        onClick={onClick}
      >
        <Box
          as="img"
          src={fullUrl}
          alt={alt}
          className={className}
          transition="transform 0.4s ease-in-out"
          _groupHover={{ transform: "scale(1.05)" }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          background="linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
          transform="translateX(-100%)"
          transition="transform 0.6s ease-in-out"
          _groupHover={{ transform: "translateX(100%)" }}
          pointerEvents="none"
        />
      </Box>
    );
  }

  return <img src={fullUrl} alt={alt} className={className} onClick={onClick} />;
};

export default ApiImage;
