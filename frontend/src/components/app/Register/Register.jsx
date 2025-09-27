import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Image,
  Img,
  useToast,
} from "@chakra-ui/react";
import { AtSignIcon, LockIcon, ViewIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import axiosClient from "../../../utils/axiosClient";
export default function UserRegister() {
  const router = useRouter();
  const toast = useToast();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const nextErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    if (!fullName || fullName.trim().length < 2) {
      nextErrors.fullName = "Insert the full name";
    }
    if (!emailRegex.test(email)) {
      nextErrors.email = "Wrong email";
    }
    // Updated password validation to match backend requirements
    if (!password || password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Z])(?=.*[\W_])/.test(password)) {
      nextErrors.password = "Password must contain at least one uppercase letter and one special character";
    }
    if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Your password not match";
    }
    setErrors(nextErrors);
    return (
      !nextErrors.fullName &&
      !nextErrors.email &&
      !nextErrors.password &&
      !nextErrors.confirmPassword
    );
  };

  const onSubmit = async () => {
    if (!validate()) return;
    try {
      const response = await axiosClient.post("/member/register", {
        full_name: fullName,
        email,
        password,
        // Removed password_confirmation as API doesn't expect it
      });

      console.log("Register success:", response.data);
      toast({
        title: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      router.push("/login");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        let errorMessage = "Registration failed!";
        
        // Handle validation errors from backend
        if (errorData.errors) {
          const firstError = Object.values(errorData.errors)[0];
          if (Array.isArray(firstError)) {
            errorMessage = firstError[0];
          } else {
            errorMessage = firstError;
          }
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        toast({
          title: "Registration failed!",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.error("Error:", error.response.data);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Bunny Models — Register</title>
      </Head>
      <Flex
        minH="calc(100vh - 0px)"
        align="center"
        justify="center"
        px={{ base: 4, md: 8, lg: 10 }}
        py={{ base: 6, md: 10, lg: 12 }}
        bg="#0f0f0f"
        fontFamily="'Aileron"
      >
        <Flex
          w={{ base: "100%", lg: "1200px" }}
          maxW="1200px"
          gap={{ base: 6, md: 8, lg: 16 }}
          align="stretch"
          direction={{ base: "column", lg: "row" }}
        >
          <Box
            flex={{ base: "none", lg: 1 }}
            bg="#070707"
            borderRadius="12px"
            boxShadow="0 10px 28px rgba(0,0,0,0.45)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minH={{ base: "180px", md: "300px", lg: "800px" }}
            border={{
              base: "6px solid #111111",
              md: "8px solid #111111",
              lg: "10px solid #111111",
            }}
          >
            <Flex direction="column" align="center" gap={{ base: 2, md: 4 }}>
              <Image
                src="/login-logo.svg"
                alt="Bunny"
                w={{ base: "60%", md: "70%", lg: "100%" }}
              />
            </Flex>
          </Box>

          <Flex
            flex={{ base: "none", lg: 1 }}
            direction="column"
            justify="center"
          >
            <Box
              pb={"8px"}
              mb={"30px"}
              borderBottom="1px solid transparent"
              sx={{
                borderImageSource:
                  "linear-gradient(90deg, rgba(153, 153, 153, 0.5) 0%, rgba(20, 20, 20, 0.5) 99.99%);",
                borderImageSlice: 1,
                borderImageWidth: 1,
                borderImageOutset: 0,
                borderImageRepeat: "stretch",
              }}
            >
              <Text
                color="#bdbdbd"
                letterSpacing="9.38%"
                fontSize={{ base: "14px", md: "21px" }}
                fontWeight={"16px"}
                fontFamily={"Aileron"}
              >
                Register a new Account
              </Text>
            </Box>

            <Flex direction="column" gap={{ base: 4, md: 5 }}>
              <InputGroup
                bg="#0b0b0b"
                borderRadius="20px"
                alignItems={"center"}
                p={{ base: 2, md: 3 }}
                h={{ base: "56px", md: "68px", lg: "75px" }}
                border={
                  errors.fullName
                    ? "2px solid #980303"
                    : "2px solid transparent"
                }
              >
                <Image
                  src="/emailicon.png"
                  alt="email"
                  w={{ base: "40px", md: "50px", lg: "60px" }}
                  h={{ base: "40px", md: "50px", lg: "60px" }}
                />

                <Input
                  type="text"
                  placeholder="Enter your Full Name"
                  border="none"
                  h={"auto"}
                  _focus={{
                    border: "none",
                    boxShadow: "none",
                    bg: "transparent",
                  }}
                  color="white"
                  fontFamily={"Aileron"}
                  bg="transparent"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: "" });
                  }}
                  onBlur={validate}
                />
              </InputGroup>
              {errors.fullName && (
                <Text
                  color="#980303"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontFamily={"Aileron"}
                  mt="2px"
                >
                  {errors.fullName}
                </Text>
              )}
              <InputGroup
                bg="#0b0b0b"
                borderRadius="20px"
                alignItems={"center"}
                p={{ base: 2, md: 3 }}
                h={{ base: "56px", md: "68px", lg: "75px" }}
                border={
                  errors.email ? "2px solid #980303" : "2px solid transparent"
                }
              >
                <Image
                  src="/emailicon.png"
                  alt="email"
                  w={{ base: "40px", md: "50px", lg: "60px" }}
                  h={{ base: "40px", md: "50px", lg: "60px" }}
                />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  border="none"
                  h={"auto"}
                  _focus={{
                    border: "none",
                    boxShadow: "none",
                    bg: "transparent",
                  }}
                  color="white"
                  fontFamily={"Aileron"}
                  bg="transparent"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  onBlur={validate}
                />
              </InputGroup>
              {errors.email && (
                <Text
                  color="#980303"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontFamily={"Aileron"}
                  mt="2px"
                >
                  {errors.email}
                </Text>
              )}

              <InputGroup
                bg="#0b0b0b"
                borderRadius="20px"
                h={{ base: "56px", md: "68px", lg: "75px" }}
                alignItems={"center"}
                p={{ base: 2, md: 3 }}
                border={
                  errors.password
                    ? "1px solid #980303"
                    : "1px solid transparent"
                }
              >
                <Image
                  src="/lockicon.png"
                  alt="email"
                  w={{ base: "40px", md: "50px", lg: "60px" }}
                  h={{ base: "40px", md: "50px", lg: "60px" }}
                />
                <InputRightElement
                  h="100%"
                  right={{ base: "16px", md: "20px", lg: "24px" }}
                >
                  <Box
                    onClick={() => setShowPassword(!showPassword)}
                    cursor="pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        setShowPassword(!showPassword);
                    }}
                  >
                    <Img
                      src="/remove_red_eye.png"
                      alt="toggle password visibility"
                      w={{ base: "18px", md: "20px" }}
                      h={{ base: "18px", md: "20px" }}
                    />
                  </Box>
                </InputRightElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  color="white"
                  fontFamily={"Aileron"}
                  pr={{ base: "48px", md: "64px", lg: "68px" }}
                  bg="transparent"
                  h={"auto"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: "" });
                  }}
                  onBlur={validate}
                />
              </InputGroup>
              {errors.password && (
                <Text
                  color="#980303"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontFamily={"Aileron"}
                  mt="2px"
                >
                  {errors.password}
                </Text>
              )}
              <InputGroup
                bg="#0b0b0b"
                borderRadius="20px"
                h={{ base: "56px", md: "68px", lg: "75px" }}
                alignItems={"center"}
                p={{ base: 2, md: 3 }}
                border={
                  errors.confirmPassword
                    ? "1px solid #980303"
                    : "1px solid transparent"
                }
              >
                <Image
                  src="/lockicon.png"
                  alt="email"
                  w={{ base: "40px", md: "50px", lg: "60px" }}
                  h={{ base: "40px", md: "50px", lg: "60px" }}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  color="white"
                  fontFamily={"Aileron"}
                  pr={{ base: "16px", md: "16px", lg: "16px" }}
                  bg="transparent"
                  h={"auto"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword)
                      setErrors({ ...errors, confirmPassword: "" });
                  }}
                  onBlur={validate}
                />
              </InputGroup>
              {errors.confirmPassword && (
                <Text
                  color="#980303"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontFamily={"Aileron"}
                  mt="2px"
                  mb={"20px"}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </Flex>

            <Button
              bg="#8C8C8C"
              color="#0f0f0f"
              fontFamily={"Aileron"}
              fontSize={{ base: "18px", md: "20px", lg: "21px" }}
              lineHeight={"100%"}
              borderRadius="20px"
              fontWeight={"700"}
              h={{ base: "56px", md: "64px", lg: "75px" }}
              _hover={{ bg: "#c7c7c7" }}
              onClick={onSubmit}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
