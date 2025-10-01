import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const MIN_LOADER_MS = 2500; // minimum time the loader should be visible
const FADE_MS = 500; // fade-out duration

const LayoutWrapper = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const loaderRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const router = useRouter();

  useEffect(() => {
    // Check if this is the very first visit to the site
    const hasVisitedBefore = localStorage.getItem('bunnymodel_first_visit');
    
    // Only show loader on first visit to any page
    if (!hasVisitedBefore) {
      setShowLoader(true);
      startTimeRef.current = Date.now();
      
      const hideWithMinimumDelay = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const remaining = Math.max(0, MIN_LOADER_MS - elapsed);

        const doFade = () => {
          const el = loaderRef.current;
          if (!el) {
            setShowLoader(false);
            return;
          }
          el.style.transition = `opacity ${FADE_MS}ms ease`;
          el.style.opacity = "0";
          setTimeout(() => {
            setShowLoader(false);
            // Mark as visited after loader completes
            localStorage.setItem('bunnymodel_first_visit', 'true');
          }, FADE_MS);
        };

        if (remaining > 0) {
          const t = setTimeout(doFade, remaining);
          return () => clearTimeout(t);
        } else {
          doFade();
        }
      };

      // If already loaded, still enforce minimum time
      if (document.readyState === "complete") {
        const cleanup = hideWithMinimumDelay();
        return cleanup;
      } else {
        const onLoad = () => hideWithMinimumDelay();
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    }
  }, []);

  return (
    <Box bg={"black"} minH={"100vh"}>
      {showLoader && (
        <Box
          id="loading"
          ref={loaderRef}
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="black"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2000}
        >
          <Image
            src="/loading-logo-anim.gif"
            alt="loading"
            w={"80px"}
            h={"80px"}
            sx={{
              imageRendering: "pixelated",
              WebkitImageSmoothing: "pixelated",
            }}
          />
        </Box>
      )}

      {router?.pathname?.startsWith("/Login") ||
      router?.pathname?.startsWith("/login") ||
      router?.pathname?.startsWith("/Register") ? null : (
        <Header />
      )}
      {children}
      {router?.pathname?.startsWith("/Login") ||
      router?.pathname?.startsWith("/login") ||
      router?.pathname?.startsWith("/Register") ? null : (
        <Footer />
      )}
    </Box>
  );
};

export default LayoutWrapper;
