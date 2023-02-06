//hashing pass
const bcrypt = require("bcrypt");
//schema models
const authModel = require("../Models/authModel");
//this is iam using for error handling
const createError = require("../utils/error");

var jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  const user = req.body;
  try {
    //for 10 length cryption
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    const CreateUser = new authModel({
      name: user.name,
      email: user.email,
      password: hash,
    });
    await CreateUser.save();
    return res.status(201).send("Registered Successfully");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  const user = req.body;
  // console.log(user);
  try {
    const gotUser = await authModel.findOne({
      email: user.email,
    });
    // console.log(gotUser);
    if (gotUser == null) return next(createError(404, "User not found"));
    //comparing here with real one
    const isPassword = await bcrypt.compare(user.password, gotUser.password);

    if (!isPassword)
      return next(createError(404, "Please check your credentials again !"));
    // console.log(gotUser.isAdmin)
    var token = jwt.sign(
      {id: gotUser._id, Admin: gotUser.isAdmin},
      process.env.Jwt,
      {expiresIn: "30 mins"}
    );
    console.log(token);
    return res.status(200).send({token, gotUser});
  } catch (err) {
    next(err);
  }
};

module.exports = {login, register};
