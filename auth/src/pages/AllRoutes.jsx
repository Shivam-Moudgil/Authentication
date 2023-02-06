import React from "react";
import {Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";
import Login from "./Login";
import NotFound from "./NotFound";
import Register from "./Register";
import UpdateProfile from "./UpdateProfile";

const AllRoutes = ({form}) => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login form={form} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/updateProfile" element={<UpdateProfile/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
