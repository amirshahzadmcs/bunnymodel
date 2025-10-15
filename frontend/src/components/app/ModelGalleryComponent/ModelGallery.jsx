import React from 'react';
import { Heading, keyframes, useBreakpointValue } from '@chakra-ui/react';

import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Link,
  Flex,
} from "@chakra-ui/react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function makeSlidesFromUrl(url) {
  if (!url) return [];
  const clean = url.split('#')[0].split('?')[0];
  const match = clean.match(/(.+_)(\d{1,3})(\.[a-zA-Z]{3,4})$/);
  if (!match) return [clean, clean, clean, clean];
  const prefix = match[1];
  const numberPart = match[2];
  const ext = match[3];
  const padLength = numberPart.length >= 2 ? numberPart.length : 2;
  const slides = [];
  for (let i = 1; i <= 4; i++) {
    const idx = i.toString().padStart(padLength, '0');
    slides.push(prefix + idx + ext);
  }
  return slides;
}
const ModelGallery = ({models}) => {
     // showSlider: true on mobile & tablet (base and md), false on large screens (desktop)
const showSlider = useBreakpointValue({ base: true, md: true, lg: false });
// Slick settings for inline cards (touch/swipe focused)
const sliderSettings = {
dots: true,
infinite: true,
speed: 300,
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
swipe: true,
adaptiveHeight: true,
lazyLoad: 'ondemand',
className:"model-slide"
};
    return (
        <>
            {/* Gallery Section */}
                <Box maxW={{base:"720px",lg:"1671.74px"}} px={"12px"} mx={"auto"}>
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
                        mb={"20px"}
                        >
                        Model Gallery
                                      
                    </Heading>

                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={{ base: '18px', md: '25px', lg: '30px' }}>
                        {models.map((model, i) => {
                            // Prefer explicit slides if provided, otherwise fallback to patterned slides from model.img
                            const slides = Array.isArray(model.slides) && model.slides.length > 0
                            ? model.slides
                            : makeSlidesFromUrl(model.img || '');

                            // Build a stable unique key for this slider (use name + index to avoid undefined img issues)
                            const sliderKey = (model.img || model.name || 'model') + '-slider-' + i;

                            return (
                            <VStack key={`${model.name}-${i}`} spacing={2} align="start">
                                <Box
                                minH="200px"
                                w="100%"
                                overflow="hidden"
                                role="group"
                                cursor={"pointer"}
                                position="relative"
                                _after={{
                                        content: '""',
                                        position: "absolute",
                                        top: 0,
                                        left: "-200%",
                                        height: "100%",
                                        width: "200%",
                                        background:
                                        "linear-gradient(110deg,transparent 0%,rgba(255, 255, 255, 0.08) 40%,rgba(255, 255, 255, 0.15) 50%,rgba(255, 255, 255, 0.08) 60%,transparent 100%)",
                                        animation: "shimmerMove 2.2s infinite",
                                        transition: "opacity 0.4s ease",
                                        opacity: 0,
                                        zIndex: 1,

                                        // ✨ Hide shimmer on mobile/tablet
                                        display: { base: "none", md: "none", lg: "block" },
                                    }}
                                    _hover={{
                                        // ✨ Only apply hover effect on desktop
                                        _after: { opacity: { base: 0, md: 0, lg: 1 } },
                                    }}
                                >
                                {showSlider ? (
                                    <Slider {...sliderSettings} key={sliderKey}>
                                    {slides.map((s, idx) => (
                                        <Box key={`${sliderKey}-slide-${idx}`} display="flex" justifyContent="center" alignItems="center">
                                        <Image
                                            src={s}
                                            alt={`${model.name}-${idx}`}
                                            w="100%"
                                            h="100%"
                                            objectFit="cover"
                                            // transition="transform 800ms ease, opacity 800ms ease"
                                            transform="scale(1)"
                                            // _groupHover={{ transform: "scale(1.05)", opacity: 0.98, transition: ".8s" }}
                                            style={{ transformOrigin: "center" }}
                                            loading="lazy"
                                        />
                                        </Box>
                                    ))}
                                    </Slider>
                                ) : (
                                    <Image
                                    src={model.img || (Array.isArray(model.slides) && model.slides[0])}
                                    alt={model.name}
                                    w="100%"
                                    h="100%"
                                    objectFit="cover"
                                    transition="transform 800ms ease, opacity 800ms ease"
                                    transform="scale(1)"
                                    _groupHover={{ transform: "scale(1.05)", opacity: 0.98, transition: ".8s" }}
                                    style={{ transformOrigin: "center" }}
                                    loading="lazy"
                                    />
                                )}
                                </Box>

                                <Text display="flex" alignItems="center" justifyContent="space-between" w="100%" mt="8px">
                                <Text as="span" fontFamily="'Aileron', sans-serif" fontSize={{ base: '14px', lg: '18px' }} color="#d4d4d4" letterSpacing="1.12px" fontWeight="400">
                                    {model.name}
                                </Text>

                                <Text as="span" fontFamily="'Aileron', sans-serif" fontSize={{ base: '12px', lg: '16px' }} color="#999999" letterSpacing="1.12px" fontWeight="400">
                                    {model.location}
                                </Text>
                                </Text>
                            </VStack>
                            );
                        })}
                    </SimpleGrid>

                </Box>
        </>
    );
};

export default ModelGallery;