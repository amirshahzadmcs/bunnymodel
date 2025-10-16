import React from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

export default function AgeVerifyPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const handleConfirm = () => {
    onClose(); // Close modal when user confirms
  };


  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="md">
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.75)"
        backdropFilter="blur(5px)"
      />
      <ModalContent
        maxW="500px"
        bg="rgb(0 0 0 / 66%)"
        borderRadius="12px"
        boxShadow="0 0 20px rgba(0, 0, 0, 0.4)"
        border="1px solid #ffffff17"
        color="white"
        textAlign="center"

        p={6}
      >
        <ModalHeader fontFamily="'Aileron', sans-serif" fontSize="22px" fontWeight="500" color="rgb(129 129 129 / 80%)" >
          Age Verification
        </ModalHeader>

        <ModalBody  px="0px">
          <Text fontFamily="'Aileron', sans-serif" fontSize="14px" fontWeight="400" color="rgb(129 129 129 / 80%)" mb="32px">
            This website contains content suitable only for adults (18+). Please
            confirm your age before proceeding.
          </Text>

          <Box borderTop="1px solid rgb(129 129 129 / 50%)" pt="16px">
            <Button
            maxW="430px"
              w="full"
              h={"44px"}
              fontFamily="'Aileron', sans-serif" 
              fontSize="16px" 
              fontWeight="400"
              bg="#81818170"
              color="#b5b5b5"
              _hover={{ bg: "#8181814a", color:"#fff" }}
              borderRadius="8px"
              _focusVisible={{boxShadow:"none"}}
              _active={{bg:"#81818170"}}
              onClick={handleConfirm}
              p={"10px"}
            >
              I’m 18 or older
            </Button>
            </Box>
            <Box mt={"20px"}>
            <Button
            background="none"
              fontFamily="'Aileron', sans-serif" fontSize="16px" fontWeight="400" color="#9d9d9d"
              _hover={{ color: "white"}}
              _active={{bg:"transparent"}}
            >
              I’m under 18
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
