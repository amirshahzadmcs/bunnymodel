import React, { useState } from "react";
import {
  Box,
  Text,
  Link,
  SimpleGrid,
  Button,
  Flex,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
const blogsData = [
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  {
    title:
      "Methods That Will Help You to Choose Luxurious Models through a Trusted Escort Agency in Germany",
    excerpt:
      "The first step towards experiencing intimacy with a gorgeous escort is to find an agency you can trust. Testimonials of previous customers back high-end escorting services. They present regulations for the business that should be followed for the safety and the comfort of both the escort and the client...",
    url: "https://bunnymodels.com/wallet/methods-that-will-help-you-to-choose-luxurious-models-through-a-trusted-escort-agency-in-germany/",
  },
  {
    title:
      "High-Class Escort Models Can Provide A Fascinating Dating Experience In Geneva",
    excerpt:
      "Dating an escort for the first time can be stressful, especially if you feel uncomfortable with the idea or are shy and do not want to screw it up from the beginning...",
    url: "https://bunnymodels.com/wallet/high-class-escort-models-can-provide-a-fascinating-dating-experience-in-geneva/",
  },
  // Add more blog items...
];
const BunnyBlog = ({ itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = blogsData.slice(startIndex, startIndex + itemsPerPage);

  const getPagination = () => {
    const pages = [];

    if (totalPages <= 4) {
      // If total pages are few, just show all
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first 2 pages
      pages.push(1, 2);

      // Show ellipsis if there are more pages in between
      if (totalPages > 3) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Box bg="black" minH="100vh" py={10} maxW="1671.74px" mx="auto" px={"12px"}>
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
          Blog
        </Heading>
      <Box px={{ base: "0px", lg: "62px" }}>
        

        <SimpleGrid spacing={8} columns={{ base: 1, md: 1 }}>
          {currentBlogs.map((blog, index) => (
            <Box
              key={index}
              borderBottom={"1px solid rgb(129 129 129 / 30%)"}
              pb="40px"
            >
              <Link
                href={blog.url}
                color="#808080"
                fontSize="16px"
                letterSpacing="2px"
                fontFamily="'Aileron', sans-serif"
                fontWeight="400"
                mb="5px"
                display="block"
                lineHeight="16px"
                _hover={{ textDecoration: "none" }}
              >
                {blog.title}
              </Link>
              <Text
                fontFamily="'Aileron', sans-serif"
                fontSize="14px"
                fontWeight="300"
                letterSpacing="2px"
                color="#808080"
                mt={2}
              >
                {blog.excerpt}{" "}
                <Link href={blog.url} color="#4d4d4d" fontSize="14px">
                  Read More
                </Link>
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Pagination */}
        <Flex justify="center" mt={8} gap="12px" align="center">
          {/* <IconButton
              icon={<ChevronLeftIcon />}
              aria-label="Previous"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
              bg="#181818"
              color="#787878"
              _hover={{ bg: "#787878", color: "#0D0D0D" }}
            /> */}
          <Box
            aria-label="Previous"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            bg="#181818"
            borderRadius="8px"
            w="36px"
            h="36px"
            fontSize="16px"
            color="#787878"
            fontWeight="600"
            textAlign={"center"}
            pt="5px"
            _hover={{ bg: "#202020" }}
            _active={{ bg: "#101010" }}
            cursor={"pointer"}
            transform="rotate(-90deg)"
          >
            ▲
          </Box>
          {getPagination().map((page, index) =>
            page === "..." ? (
              <Box
                key={index}
                px={2}
                bg="#181818"
                borderRadius="8px"
                w="36px"
                h="36px"
                fontSize="16px"
                color="#787878"
                fontWeight="600"
                textAlign={"center"}
                pt="5px"
                _hover={{ bg: "#202020" }}
                _active={{ bg: "#101010" }}
              >
                {page}
              </Box>
            ) : (
              <Button
                key={index}
                borderRadius="8px"
                w="36px"
                h="36px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontFamily="'Aileron', sans-serif"
                fontSize="16px"
                fontWeight="600"
                bg={currentPage === page ? "#787878" : "#181818"}
                color={currentPage === page ? "#0D0D0D" : "#787878"}
                _hover={{ color: "#fff" }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            )
          )}

          <IconButton
            icon={<ChevronRightIcon />}
            aria-label="Next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
            bg="#181818"
            color="#787878"
            _hover={{ bg: "#787878", color: "#0D0D0D" }}
          />
          <Box
            aria-label="Next"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            isDisabled={currentPage === totalPages}
            bg="#181818"
            borderRadius="8px"
            w="36px"
            h="36px"
            fontSize="16px"
            color="#787878"
            fontWeight="600"
            textAlign={"center"}
            pt="5px"
            _hover={{ bg: "#202020" }}
            _active={{ bg: "#101010" }}
            cursor={"pointer"}
            transform="rotate(90deg)"
          >
            ▲
          </Box>
        </Flex>
      </Box>
      
    </Box>
  );
};

export default BunnyBlog;
