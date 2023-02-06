import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const obj = {
  email: "",
  password: "",
};
export default function Login({form}) {
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
        .post(`http://localhost:4040/login`, state)
        .then((res) => {
          toast({
            title: "Logged in",
            status: "success",
            duration: 3000,
            isClosable: true,
          }),
            console.log(res.data);
          form()
          localStorage.setItem("role", JSON.stringify(res.data.token));
          localStorage.setItem("id", JSON.stringify(res.data.gotUser._id));
          navigate("/");

        })
        .catch((err) => {
          toast({
            title: "Email or password is incorrect",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
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
          <Heading fontSize={"2xl"}>Sign in to your account</Heading>
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
            Sign in
          </Button>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          loading="lazy"
          objectFit={"cover"}
          borderRadius={"2rem"}
          w={"90%"}
          m="auto"
          mt={3}
          src={
            "https://media.istockphoto.com/id/1312423123/vector/online-registration-and-sign-up-concept-flat-vector-illustration.jpg?s=612x612&w=0&k=20&c=0q20WWwJg9fvmKuGBn4IC68zzd4J65X88B9XnC-37h0="
          }
        />
      </Flex>
    </Stack>
  );
}
