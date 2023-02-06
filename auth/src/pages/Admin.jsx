import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Button, Center, Heading, Text} from "@chakra-ui/react";
const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = JSON.parse(localStorage.getItem("role"));
  //   console.log();
  const getUSers = () => {
    return axios
      .get("http://localhost:4040/users", {params: {token}})
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };
//   console.log(users);
  useEffect(() => {
    getUSers();
  }, []);
  return (
    <>
      <Center>
        <Heading>List of users</Heading>
          </Center>
          <Box w={"70%"} m={"auto"} display={"grid"} gridTemplateColumns={"repeat(3,1fr)"} gap={"30px"} justifyContent="space-around">
          {users.map((el,i) => {
              return (
                <Box key={i} padding={"20px"} border={"2px solid "}>
                  <Text>
                    <span style={{fontWeight: "bold"}}>Name :</span> {el.name}
                  </Text>
                  <Text>
                    <span style={{fontWeight: "bold"}}>Email :</span> {el.email}
                      </Text>
                </Box>
              );
     })}</Box>
    </>
  );
};

export default Admin;
