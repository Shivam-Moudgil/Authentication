import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const obj = {
  name: "",
  email: "",
  password: "",
};
export default function Register() {
  const [state, setState] = useState(obj);
  const navigate = useNavigate();
  const toast = useToast();
  const changeInput = (e) => {
    const {type, checked, value, name} = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setState({...state, [name]: inputValue});
  };

  const submitForm = async () => {
    if (state.password == "" || state.email == "") {
      return toast({
        title: "Please fill input field first",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      return await axios
        .post(`http://localhost:4040/register`, state)
        .then(
          (res) =>
            toast({
              title: "Registered successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            }),
          setState(obj),
          navigate("/login")
        )
        .catch((err) =>
          toast({
            title: "Email is already in use",
            status: "warning",
            duration: 3000,
            isClosable: true,
          })
        );
    } catch (err) {
      toast({
        title: err,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack direction={{base: "column", md: "row"}}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Register your account</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              value={state.name}
              onChange={changeInput}
              name="name"
              type="name"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={state.email}
              onChange={changeInput}
              name="email"
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={state.password}
              onChange={changeInput}
              name="password"
              type="password"
            />
          </FormControl>
          <Button onClick={submitForm} colorScheme={"blue"} variant={"solid"}>
            Sign up
          </Button>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          loading="lazy"
          objectFit={"cover"}
          borderRadius={"2rem"}
          w={"90%"}
          src={
            "https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?w=900"
          }
        />
      </Flex>
    </Stack>
  );
}
