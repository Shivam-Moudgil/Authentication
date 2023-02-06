const express = require("express");
const {Alluser, Finduser, deluser} = require("../Controllers/users");
const {verifyAdmin, verifyUser} = require("../utils/verifyToken");
// const createError = require("../utils/error");
const app = express.Router();

//iam providing here my admin id from atlas im changing it:-so if you want access other routes than
// {
//     "name": "Shivam",
//         "email": "MrShivam@gmail.com",
//         "password": "AreYouAlright"
//login with this and the token will identify
// }
app.get("/", verifyAdmin, Alluser);

//user will not be able to see roles and who is admin
app.get("/:id", verifyUser, Finduser);

app.delete("/:id", verifyUser, deluser);

module.exports = app;
