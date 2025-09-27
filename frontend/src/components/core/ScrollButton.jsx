import React, { useEffect, useState } from "react";
import { ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Button, Img } from "@chakra-ui/react";

export default function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Box
          onClick={scrollToTop}
          position="fixed"
          bottom="20px"
          right={["16px", "84px"]}
          zIndex={999}
        >
          <Button
            size={"sm"}
            w="44px"
            h="44px"
            colorScheme={"linear-gradient(135deg, #0C1E21 0%, #003640 100%)"}
            bgGradient="linear-gradient(135deg, #0C1E21 0%, #003640 100%)"
            borderRadius={"50%"}
            variant="solid"
          >
            <Img src="/Polygon.svg"></Img>
          </Button>
        </Box>
      )}
    </>
  );
}
