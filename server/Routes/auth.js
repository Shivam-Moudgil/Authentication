const express = require("express");
const {register, login} = require("../Controllers/Auth");
const { verifyAdmin } = require("../utils/verifyToken");
const app = express.Router();

app.post("/register", register);

app.post("/login", login);

module.exports = app;
