const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyUser = (req, res, next) => {
  const token = req.query.token;
  // console.log(req.params);
// console.log("token", token)/
  if (!token) return next(createError(401, "You are not Authenticated"));

  jwt.verify(token, process.env.Jwt, (err, user) => {
    if (err)
      return next(createError(403, "Invalid Token! or Token is expired"));
    req.user = user;
  });
  // console.log(req.user);
  if (req.user.id === req.params.id || req.user.Admin) {
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

const verifyAdmin = (req, res, next) => {
  const token = req.query.token;
  // console.log(token);

  if (!token) return next(createError(401, "You are not Authenticated"));

  jwt.verify(token, process.env.Jwt, (err, user) => {
    if (err)
      return next(createError(403, "Invalid Token! or Token is expired"));
    req.user = user;
  });
  console.log(req.user);
  if (req.user.Admin) {
    // console.log(req.user.Admin);
    next();
  } else {
    return next(createError(403, "You are not authorized!"));
  }
};

const verifyExpiry = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "You are not Authenticated"));

  jwt.verify(token, process.env.Jwt, (err, user) => {
    if (err) return next(createError(403, "Token is expired"));
    next();
  });
};

module.exports = {verifyAdmin, verifyUser, verifyExpiry};
