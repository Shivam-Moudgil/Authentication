import {Box, Text} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

const Navbar = ({token, render, form}) => {
  let a;
  useEffect(() => {
    console.log(token);
  }, [render]);
  const remove = () => {
    if (token !== null) {
      localStorage.clear();
    }
    form();
  };
  return (
    <Box
      display="flex"
      bg={"black"}
      fontFamily="cursive"
      padding={"20px"}
      justifyContent="space-around"
      color={"white"}
    >
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Box display={"flex"} gap={"100px"}>
        <Link to="/login">
          <Text onClick={remove}>{token == null ? "Login" : "Logout"}</Text>
        </Link>

        <Link to="/register">Register</Link>
        <Link to="/updateProfile">Profile</Link>
      </Box>
    </Box>
  );
};

export default Navbar;
