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

export default function LoginForm({ switchToSignup }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = () => {
    let newErrors = { email: "", password: "" };
    if (!email.trim()) newErrors.email = "Please enter your email";
    if (!password.trim()) newErrors.password = "Please enter your password";
    setErrors(newErrors);
  };

  return (
    <Box
      h="auto"
      bg="#000"
      maxW="1671.74px" px={"25px"} mb="32px"
      mx={"auto"}
      mt={"80px"}
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
            Login
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
            Log in to your Account
        </Text>
        {/* Email */}
        <FormControl >
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
            <Image src="/emailicon.png" alt="email" w={"47px"}/>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}       
            p={"10px 21px 10px 16px"}
            color="#ffff"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            _placeholder={{ color: "#808080",opacity:".3" }}
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
             p={"10px 21px 10px 16px"}
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
              >
                {showPassword ? (
                  <Image
                    src="/eye-close.svg"
                    alt="Hide password"
                    opacity={".8"}
                    _hover={{ opacity: "1" }}
                  />
                ) : (
                  <Image
                    src="/eye.svg"
                    alt="Show password"
                    opacity={".8"}
                    _hover={{ opacity: "1" }}
                  />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              fontWeight="400"
              color="rgb(213 0 0 / 50%)"
              mt={1}
            >
              {errors.password}
            </Text>
          )}
        </FormControl>

        {/* Forgot + SignUp */}
        <Flex justify="space-between" w="100%">
          <Link
            fontFamily="'Aileron', sans-serif"
            fontSize="16px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ color: "#fff", textDecor: "none" }}
          >
            Forgot Password?
          </Link>
          <Link
            href="/registration"
            cursor="pointer"
            fontFamily="'Aileron', sans-serif"
            fontSize="16px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ color: "#fff", textDecor: "none" }}
          >
            Sign Up
          </Link>
        </Flex>

        {/* Login Button */}
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
          Login
        </Button>
      </VStack>
    </Box>
  );
}
