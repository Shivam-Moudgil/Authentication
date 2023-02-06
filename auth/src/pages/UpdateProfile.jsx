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
  Box,
} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
const obj = {
  name: "",
  email: "",
  password: "",
};
export default function UpdateProfile() {
  const [profile, setProfile] = useState({});

  const [state, setState] = useState(obj);
  const token = JSON.parse(localStorage.getItem("role"));
  const id = JSON.parse(localStorage.getItem("id"));

  const getUSer = () => {
    return axios
      .get("http://localhost:4040/users/" + id, {params: {token}})
      .then((res) => setProfile(res.data))
      .catch((err) => console.log(err));
  };
  //   console.log(users);
  useEffect(() => {
    getUSer();
  }, []);

  const navigate = useNavigate();
  const toast = useToast();
  const changeInput = (e) => {
    const {type, checked, value, name} = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setState({...state, [name]: inputValue});
  };

  const submitForm = async () => {
    if (state.password == "" || state.email == "" || state.name == "") {
      return toast({
        title: "Please fill input field first",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      return await axios
        .patch(`http://localhost:4040/reset-password/${id}`, state, {
          params: {token},
        })
        .then((res) => {
          toast({
            title: "updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          }),
            // console.log(res);
            setState(obj);
        })
        .catch((err) =>
          toast({
            title: err.message,
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
          <Heading fontSize={"2xl"}>Update your account</Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              value={state.name}
              onChange={changeInput}
              placeholder={profile.name}
              name="name"
              type="name"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              value={state.email}
              onChange={changeInput}
              placeholder={profile.email}
              name="email"
              type="email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              value={state.password}
              onChange={changeInput}
              //   placeholder={profile.password}
              name="password"
              type="password"
            />
          </FormControl>
          <Button onClick={submitForm} colorScheme={"blue"} variant={"solid"}>
            Update profile
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
            "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fGNvbXB1dGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          }
        />
      </Flex>
    </Stack>
  );
}
