import {
  Box,
  Button,
  Flex,
  FormControl,
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
      bg="rgb(0 0 0 / 96%)"
      borderRadius="12px"
      boxShadow="0 0 25px rgba(0, 0, 0, 0.5)"
      backdropFilter={"blur(20px)"}
      border="1px solid #ffffff17"
      p={"30px 20px"}
    >
      <Text
        fontFamily="'Aileron', sans-serif"
        fontSize="18px"
        fontWeight="500"
        color="rgb(129 129 129 / 80%)"
        mb={"25px"}
        textAlign={"center"}
      >
        Log In
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Email */}
        <FormControl>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            border="1px solid"
            borderColor="rgb(255 255 255 / 4%)"
            borderRadius="8px"
            w="100%"
            h="50px"
            bg="rgb(255 255 255 / 5%)"
            p={"10px 21px"}
            color="#ffff"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            _placeholder={{ color: "#808080" }}
            aria-required="true"
            _focusVisible={{ borderColor: "rgb(255 255 255 / 4%)" }}
            _hover={{ borderColor: "rgb(255 255 255 / 4%)" }}
          />
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
          <InputGroup>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              border="1px solid"
              borderColor="rgb(255 255 255 / 4%)"
              borderRadius="8px"
              w="100%"
              h="50px"
              bg="rgb(255 255 255 / 5%)"
              p={"10px 21px"}
              color="#ffff"
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              _placeholder={{ color: "#808080" }}
              aria-required="true"
              _focusVisible={{ borderColor: "rgb(255 255 255 / 4%)" }}
              _hover={{ borderColor: "rgb(255 255 255 / 4%)" }}
            />
            <InputRightElement>
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
            fontSize="13px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ color: "rgb(129 129 129 / 80%)", textDecor: "underline" }}
          >
            Forgot Password?
          </Link>
          <Link
            onClick={switchToSignup}
            cursor="pointer"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ textDecor: "underline" }}
          >
            Sign Up
          </Link>
        </Flex>

        {/* Login Button */}
        <Button
          h={"44px"}
          fontFamily="'Aileron', sans-serif"
          fontSize="16px"
          fontWeight="400"
          bg="#81818170"
          color="#b5b5b5"
          _hover={{ bg: "#81818170", color: "#fff", transform: "scale(1.03)" }}
          borderRadius="8px"
          _focusVisible={{ boxShadow: "none" }}
          _active={{ bg: "#81818170" }}
          p={"10px"}
          transition="all 0.3s ease"
          mt={"30px !important"}
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
}
