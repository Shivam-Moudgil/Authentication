const express = require("express");
const {patchuser} = require("../Controllers/users");
const {verifyUser} = require("../utils/verifyToken");
const app = express.Router();


//can update password from here
app.patch("/:id", verifyUser, patchuser);


module.exports = app;
