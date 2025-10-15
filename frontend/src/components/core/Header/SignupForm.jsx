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

export default function SignupForm({ switchToLogin }) {
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
        Create Account
      </Text>

      <VStack spacing={4} align="stretch">
        {/* Name */}
        <FormControl>
          <Input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              color="#fff"
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              _placeholder={{ color: "#808080" }}
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
          <InputGroup>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              border="1px solid"
              borderColor="rgb(255 255 255 / 4%)"
              borderRadius="8px"
              w="100%"
              h="50px"
              bg="rgb(255 255 255 / 5%)"
              p={"10px 21px"}
              color="#fff"
              fontFamily="'Aileron', sans-serif"
              fontSize="13px"
              _placeholder={{ color: "#808080" }}
              _focusVisible={{ borderColor: "rgb(255 255 255 / 4%)" }}
              _hover={{ borderColor: "rgb(255 255 255 / 4%)" }}
            />
            <InputRightElement>
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
        <Flex justify="space-between" w="100%">
          <Link
            onClick={switchToLogin}
            cursor="pointer"
            fontFamily="'Aileron', sans-serif"
            fontSize="13px"
            fontWeight="400"
            color="rgb(129 129 129 / 80%)"
            _hover={{ textDecor: "underline" }}
          >
            Back to Login
          </Link>
        </Flex>

        {/* Signup Button */}
        <Button
          h={"44px"}
          fontFamily="'Aileron', sans-serif"
          fontSize="16px"
          fontWeight="400"
          bg="#81818170"
          color="#b5b5b5"
          _hover={{
            bg: "#81818170",
            color: "#fff",
            transform: "scale(1.03)",
          }}
          borderRadius="8px"
          _focusVisible={{ boxShadow: "none" }}
          _active={{ bg: "#81818170" }}
          p={"10px"}
          transition="all 0.3s ease"
          mt={"30px !important"}
          onClick={handleLogin}
        >
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
}
