import {
  Box,
  Container,
  Grid,
  Text,
  Image,
  Heading,
  Spinner,
  Center,
  VStack,
  useBreakpointValue,
  useMediaQuery,
  Img,
} from "@chakra-ui/react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import axiosClient from "../../../utils/axiosClient";
import ApiImage from "../Apiimage/ApiImage";

// Simulated network delay for loader visibility (ms)
const LOAD_DELAY_MS = 2400;

// Define the sequence: P1 through P24
const folderSequence = Array.from({ length: 24 }, (_, i) => `P${i + 1}`);
const imagesPerFolder = 5;

// Memoize static data to prevent recreation
const cities = [
  "Paris",
  "Zurich",
  "Boston",
  "London",
  "Geneva",
  "Frankfurt",
  "Basel",
  "Milan",
];

const names = [
  "Olivia",
  "Carmen",
  "Daniela",
  "Evana",
  "Maggie",
  "Suzen",
  "Lione",
  "Victoria",
  "Sofia",
  "Emma",
  "Luna",
  "Aria",
  "Maya",
  "Zoe",
  "Nora",
  "Iris",
  "Eva",
  "Lily",
  "Chloe",
  "Grace",
];

// Generate models in the specified sequence - memoized
const generateModels = () => {
  const models = [];

  folderSequence.forEach((folder, folderIndex) => {
    for (let i = 1; i <= imagesPerFolder; i++) {
      const imageNumber = i.toString().padStart(2, "0");
      const modelIndex = folderIndex * imagesPerFolder + i - 1;

      models.push({
        name: names[modelIndex % names.length],
        city: cities[modelIndex % cities.length],
        image: `/${folder}/${folder}_${imageNumber}.jpg`,
        folder: folder,
        row: folderIndex + 1,
      });
    }
  });

  return models;
};

const allModels = generateModels();

// Lazy Loading Image Component
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={imgRef}
      position="relative"
      overflow="hidden"
      role="group"
      {...props}
    >
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          objectFit="cover"
          opacity={isLoaded ? 1 : 0}
          transition="opacity 0.5s ease, transform 0.6s ease"
          transform="scale(1)"
          _groupHover={{ transform: "scale(1.06)" }}
          onLoad={() => setIsLoaded(true)}
          fallbackSrc="/placeholder-model.jpg"
        />
      )}
      <Box
        pointerEvents="none"
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        transform="translateX(-120%)"
        _groupHover={{ transform: "translateX(120%)" }}
        transition="transform 650ms ease"
        bg="linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%)"
        mixBlendMode="screen"
      />
      {!isLoaded && isInView && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="gray.800"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="gray.400"
          fontSize="14px"
        >
          Loading...
        </Box>
      )}
    </Box>
  );
};

// Mobile slider (one image per view) with segmented indicator
const MobileSlider = ({ items }) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / Math.max(1, w));
      setIndex(Math.min(items.length - 1, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  return (
    <Box>
      <Box
        ref={containerRef}
        display="flex"
        overflowX="auto"
        scrollSnapType="x mandatory"
        sx={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {items.map((model, i) => (
          <Box key={i} minW="100%" scrollSnapAlign="center" px={0}>
            <Box
              position="relative"
              width="100%"
              mb={4}
              overflow="hidden"
              cursor="pointer"
            >
              <ApiImage
                src={model.images?.[0]?.image || "P1_01.jpg"}
                alt={`${model.firstname} ${model.lastname}`}
                className="w-full h-auto object-cover"
                onClick={() => handleModelClick(model)}
                showHoverEffect={true}
              />
            </Box>
            {/* Segmented indicator */}
            <Box mt={3} px={1} display="flex" gap={2}>
              {items.map((_, i) => (
                <Box
                  key={i}
                  flex="1"
                  height="2px"
                  bg={i === index ? "#cfcfcf" : "#2e2e2e"}
                  borderRadius="2px"
                  transition="background-color 200ms ease"
                />
              ))}
            </Box>
            
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              color="white"
              px={1}
              mt={3}
            >
              <Text
                fontSize="16px"
                fontWeight="400"
                fontFamily="Inter"
                lineHeight={"20px"}
              >
                {model.firstname} {model.lastname}
              </Text>
              <Text
                fontSize="14px"
                fontWeight="400"
                lineHeight={"16px"}
                fontFamily="Inter"
                color="#999999"
              >
                {model.city} 
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Tablet slider component for individual model images
const TabletSlider = ({ model, onModelClick }) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  
  // Get all images for this model (assuming model.images is an array)
  const modelImages = model.images || [];
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const i = Math.round(el.scrollLeft / Math.max(1, w));
      setIndex(Math.min(modelImages.length - 1, Math.max(0, i)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [modelImages.length]);

  return (
    <Box>
      <Box
        ref={containerRef}
        display="flex"
        overflowX="auto"
        scrollSnapType="x mandatory"
        sx={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {modelImages.map((imageData, i) => (
          <Box key={i} minW="100%" scrollSnapAlign="center" px={0}>
            <Box
              position="relative"
              width="100%"
              mb={4}
              overflow="hidden"
              cursor="pointer"
            >
              <ApiImage
                src={imageData?.image || "P1_01.jpg"}
                alt={`${model.firstname} ${model.lastname}`}
                className="w-full h-auto object-cover"
                onClick={() => onModelClick(model)}
                showHoverEffect={true}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Segmented indicator */}
      {modelImages.length > 1 && (
        <Box mt={'auto'} px={1} display="flex" gap={2} w={'151px'}>
          {modelImages.map((_, i) => (
            <Box
              key={i}
              flex="1"
              height="2px"
              bg={i === index ? "#cfcfcf" : "#2e2e2e"}
              borderRadius="2px"
              transition="background-color 200ms ease"
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default function ModelGallery() {
  const router = useRouter();
  const [modals, setModals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20); // show first 20 images (P1-P4) on load
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef(null);
  const [isBelow1536px] = useMediaQuery('(max-width: 1535px)');
  const [isMobileDevice] = useMediaQuery('(max-width: 575px)');
  const [isTabletDevice] = useMediaQuery('(min-width: 576px) and (max-width: 991px)');
  
  // Show mobile slider only on actual mobile devices (below 576px)
  const shouldShowMobileSlider = isMobileDevice;
  // Show tablet slider on tablet devices (576px-991px)
  const shouldShowTabletSlider = isTabletDevice;
  const [mobileSlides, setMobileSlides] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axiosClient.get(
          `/models?limit=${limit}&page=${currentPage}`
        );
        if (response.data.status === "success") {
          if (currentPage === 1) {
            setModals(response.data.models);
            setHasMore(response.data.models.length === limit);
          } else {
            setModals((prev) => [...prev, ...response.data.models]);
            setHasMore(response.data.models.length === limit);
          }
        } else {
          setError(response.data.message || "Something went wrong");
        }
      } catch (err) {
        setError(err.message || "Request failed");
      } finally {
        setLoading(false);
        setIsLoading(false);
      }
    };

    fetchModels();
  }, [currentPage, limit]);

  const items = modals;

  // Scroll-based loading
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          console.log("Scroll detected, loading next page...", {
            currentPage,
            hasMore,
            isLoading,
          });
          setIsLoading(true);
          setCurrentPage((prev) => prev + 1);
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, currentPage]);

  // Prepare mobile slider groups client-side to avoid SSR hydration mismatch
  useEffect(() => {
    if (shouldShowMobileSlider) {
      // Take first 8 items and split into two groups of 4 for mobile sliders
      const first = items.slice(0, 4);
      const second = items.slice(4, 8);

      setMobileSlides([first, second]);
    } else {
      setMobileSlides(null);
    }
  }, [shouldShowMobileSlider, items]);

  const handleModelClick = (model) => {
    router.push(`/Profile?username=${model.username}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Box bg="black" minH="100vh" >
      <Container maxW="1732.93px" px={{base:'36px',md:'16px',}}>
        {/* Title */}
        <Box
          mb={"30px"}
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
            fontSize="24px"
            lineHeight={"30px"}
            fontWeight="400"
            color=" #808080;"
            fontFamily="Aileron"
            textAlign={'center'}
            mb={"10px"}
            position="relative"
          >
            Model Gallery
          </Heading>
         
        
        </Box>

        {/* Mobile: two stacked sliders showing P1 and P2 images - only on actual mobile devices */}
        {shouldShowMobileSlider ? (
          <Box>
            <MobileSlider
              items={(mobileSlides && mobileSlides[0]) || items.slice(0, 4)}
            />
            <Box h={8} />
            <MobileSlider
              items={(mobileSlides && mobileSlides[1]) || items.slice(4, 8)}
            />
          </Box>
        ) : shouldShowTabletSlider ? (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={8}
            maxW="1671.74px"
            mx="auto"
          >
            {items.map((model, index) => (
              <Box key={index} position="relative" cursor="pointer">
                <TabletSlider
                  model={model}
                  onModelClick={handleModelClick}
                />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  color="white"
                  mt={4}
                >
                  <Text
                    fontSize="24px"
                    fontWeight="400"
                    fontFamily="Aileron"
                    lineHeight={"20px"}
                  >
                    {model.firstname} {model.lastname}
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="400"
                    lineHeight={"16px"}
                    fontFamily="Aileron"
                    color="#999999"
                  >
                    {model.city}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
              xl: "repeat(4, 1fr)",
              "2xl": "repeat(4, 1fr)",
            }}
            gap={8}
            maxW="1671.74px"
            mx="auto"
          >
            {items.map((model, index) => (
              <Box key={index} position="relative" cursor="pointer">
                <Box position="relative" width="100%" mb={4} overflow="hidden">
                  <ApiImage
                    src={model.images?.[0]?.image || "P1_01.jpg"}
                    alt={`${model.firstname} ${model.lastname}`}
                    className="w-full h-auto object-cover"
                    onClick={() => handleModelClick(model)}
                    showHoverEffect={true}
                  />
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  color="white"
                >
                  <Text
                    fontSize="18px"
                    fontWeight="400"
                    fontFamily="Aileron"
                    lineHeight={"20px"}
                  >
                    {model.firstname} {model.lastname}
                  </Text>
                  <Text
                    fontSize="15px"
                    fontWeight="400"
                    lineHeight={"16px"}
                    fontFamily="Aileron"
                    color="#999999"
                  >
                    {model.city}
                  </Text>
                </Box>
              </Box>
            ))}
          </Grid>
        )}

        {/* Loader / Sentinel */}
        <Box ref={sentinelRef} mt={10}>
          {isLoading && hasMore && (
            <Center>
              <VStack spacing={3}>
                <Spinner
                  thickness="2px"
                  speed="0.65s"
                  emptyColor="gray.700"
                  color="white"
                  size="lg"
                />
                <Text color="gray.300" fontSize="14px">
                  Loading more models...
                </Text>
              </VStack>
            </Center>
          )}
          {!hasMore && (
            <Center>
              {/* <Text color="gray.400" fontSize="14px">
                No more models to load
              </Text> */}
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}
