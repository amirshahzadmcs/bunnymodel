import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ResisterForm({ switchToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleLogin = () => {
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    };

    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim()) newErrors.email = "Please enter your email";
    if (!password.trim()) newErrors.password = "Please enter your password";
    if (!confirmpassword.trim())
      newErrors.confirmpassword = "Please confirm your password";

    setErrors(newErrors);
  };

  return (
    <Box
    h="auto"
      bg="#000"
      maxW="1671.74px" px={"25px"} mb="32px"
      mx={"auto"}
      mt={{base:"10px",md:"80px"}}
    >
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
            fontFamily="'Aileron', sans-serif"
            color="#818181"
            borderBottom={"1px solid rgb(129 129 129 / 30%)"}
            mb="20px"
          >
            Registration
          </Heading>

      <VStack spacing={4} align="stretch" maxW={"533px"} mx={"auto"} mt={"60px"}>
        <Text
            fontWeight="400"
            fontSize="16px"
            lineHeight={"28px"}
            color="#818181"
            fontFamily="'Aileron', sans-serif"
            mb={"9px"}
        >
            Create your Account

        </Text>
        {/* Name */}
        <FormControl>
            <InputGroup
                border="1px solid"
            borderColor="rgb(255 255 255 / 4%)"
            borderRadius="18px"
            w="100%"
            h="50px"
            bg="rgb(255 255 255 / 5%)"
            display={"flex"}
            alignItems={"center"}
            p={"6px"}
            height={"60px"}>
            <Box as="span"
            bg="#141414"
            w="47px"
            h="47px"
            borderRadius="15px"
            zIndex="1"
            left="6px"
            top="6.7px"
            display="flex"
            alignItems="center"
            justifyContent={"center"}
            ><Image src="/profile-icon.svg" alt="email" opacity={".6"} maxW={"20px"}/></Box>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            p={"10px 21px"}
            color="#ffff"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            _placeholder={{ color: "#808080",opacity:".3"  }}
            aria-required="true"
            _focusVisible={{ borderColor: "none" }}
            _hover={{ borderColor: "none" }}
            bg={"none"}
            border={"none"}
          />
          </InputGroup>
          {errors.name && (
            <Text
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              fontWeight="400"
              color="rgb(213 0 0 / 50%)"
              mt={1}
            >
              {errors.name}
            </Text>
          )}
        </FormControl>

        {/* Email */}
        <FormControl>
            <InputGroup
            border="1px solid"
            borderColor="rgb(255 255 255 / 4%)"
            borderRadius="18px"
            w="100%"
            h="50px"
            bg="rgb(255 255 255 / 5%)"
            display={"flex"}
            alignItems={"center"}
            p={"6px"}
            height={"60px"}>
            <Image src="/lockicon.png" alt="email" w={"47px"}/>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            p={"10px 21px"}
            color="#ffff"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            _placeholder={{ color: "#808080",opacity:".3"  }}
            aria-required="true"
            _focusVisible={{ borderColor: "none" }}
            _hover={{ borderColor: "none" }}
            bg={"none"}
            border={"none"}
          />
          </InputGroup>
          {errors.email && (
            <Text
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              fontWeight="400"
              color="rgb(213 0 0 / 50%)"
              mt={1}
            >
              {errors.email}
            </Text>
          )}
        </FormControl>

        {/* Password */}
        <FormControl>
          <InputGroup 
           border="1px solid"
            borderColor="rgb(255 255 255 / 4%)"
            borderRadius="18px"
            w="100%"
            h="50px"
            bg="rgb(255 255 255 / 5%)"
            display={"flex"}
            alignItems={"center"}
            p={"6px"}
            height={"60px"}>
          <Image src="/lockicon.png" alt="email" w={"47px"}/>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              p={"10px 21px"}
                color="#ffff"
                fontFamily="'Aileron', sans-serif"
                fontSize="13px"
                _placeholder={{ color: "#808080",opacity:".3"  }}
                aria-required="true"
                _focusVisible={{ borderColor: "none" }}
                _hover={{ borderColor: "none" }}
                bg={"none"}
                border={"none"}
            />
            <InputRightElement bottom={"0"} h={"100%"}>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                onClick={() => setShowPassword(!showPassword)}
                p={"0"}
                minW={"auto"}
                maxW={"18px"}
                _active={{ background: "transparent" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Image
                  src={
                    showPassword
                      ? "/eye-close.svg"
                      : "/eye.svg"
                  }
                  alt={showPassword ? "Hide password icon" : "Show password icon"}
                  opacity={".8"}
                  _hover={{ opacity: "1" }}
                />
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text fontSize="13px" color="rgb(213 0 0 / 50%)" mt={1}>
              {errors.password}
            </Text>
          )}
        </FormControl>

        {/* Confirm Password */}
        <FormControl>
          <InputGroup
          border="1px solid"
            borderColor="rgb(255 255 255 / 4%)"
            borderRadius="18px"
            w="100%"
            h="50px"
            bg="rgb(255 255 255 / 5%)"
            display={"flex"}
            alignItems={"center"}
            p={"6px"}
            height={"60px"}>
                <Image src="/lockicon.png" alt="email" w={"47px"}/>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              p={"10px 21px"}
            color="#ffff"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            _placeholder={{ color: "#808080",opacity:".3"  }}
            aria-required="true"
            _focusVisible={{ borderColor: "none" }}
            _hover={{ borderColor: "none" }}
            bg={"none"}
            border={"none"}
            />
            <InputRightElement bottom={"0"} h={"100%"}>
              <Button
                bg="transparent"
                _hover={{ bg: "transparent" }}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                p={"0"}
                minW={"auto"}
                maxW={"18px"}
                _active={{ background: "transparent" }}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                <Image
                  src={
                    showConfirmPassword
                      ? "/eye-close.svg"
                      : "/eye.svg"
                  }
                  alt={
                    showConfirmPassword
                      ? "Hide confirm password icon"
                      : "Show confirm password icon"
                  }
                  opacity={".8"}
                  _hover={{ opacity: "1" }}
                />
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.confirmpassword && (
            <Text fontSize="13px" color="rgb(213 0 0 / 50%)" mt={1}>
              {errors.confirmpassword}
            </Text>
          )}
        </FormControl>

        {/* Back to Login */}
        <Flex justify="flex-end" w="100%">
          <Link
            href="/login"
            cursor="pointer"
            fontFamily="'Aileron', sans-serif"
            fontSize="16px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ textDecor: "none", color:"#fff" }}
          >
            Back to Login
          </Link>
        </Flex>

        {/* Signup Button */}
        <Button
          h={"60px"}
          fontFamily="'Aileron', sans-serif"
          fontSize="16px"
          fontWeight="400"
          bg="#8C8C8C"
          color="#000"
          _hover={{ bg: "#8C8C8C", color: "#000" }}
          borderRadius="18px"
          _focusVisible={{ boxShadow: "none" }}
          _active={{ bg: "#8C8C8C" }}
          p={"10px"}
          transition="all 0.3s ease"
          mt={"14px !important"}
          onClick={handleLogin}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}
