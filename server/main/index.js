const express = require("express");
require("dotenv").config();
const app = express();
const Port = process.env.PORT;
const cors = require("cors");
const connect = require("../config/db.js");
//for cookies
const cookieParser = require("cookie-parser");
const Auth = require("../Routes/auth");
const Users = require("../Routes/users");
const REset = require("../Routes/reset");
const {verifyExpiry} = require("../utils/verifyToken.js");

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/", Auth);
app.use("/users", Users);
app.use("/reset-password", REset);

app.get("/verify", verifyExpiry, (req, res) => {
  res.status(200).send("Token is not expired yet");
});

//error handling by middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went Wrong";
  return res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to Shivam World");
});

//Port from env file
app.listen(Port, () => {
  connect();
  console.log(`http://localhost:${Port}`);
});
