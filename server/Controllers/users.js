const userModel = require("../Models/authModel");

//only admin will be able to see all
const Alluser = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.status(200).send(users);
    console.log("users");
  } catch (err) {
    next(err);
  }
};

//Find user
const Finduser = async (req, res, next) => {
  const {id} = req.params;
  try {
    let user = await userModel.findById(id);
    const {isAdmin, ...otherDetails} = user._doc;
    if (user) {
      res.send(otherDetails);
    } else {
      res.send("user not found");
    }
  } catch (e) {
    next(e);
  }
};

//delete method
const deluser = async (req, res, next) => {
  const {id} = req.params;
  try {
    if (id) {
      const deleteUser = await userModel.findByIdAndDelete(id);
      if (deleteUser)
        return res.status(200).send(`Deleted |${id}| successfully `);
    }
  } catch (e) {
    next(e);
  }
};

//update
const patchuser = async (req, res, next) => {
  const {id} = req.params;
  const data = req.body;

  try {
    let updateData = await userModel.findByIdAndUpdate(
      id,
      {$set: data},
      {new: true}
    );
    const {isAdmin, ...otherDetails} = updateData._doc;
    res.status(200).send(otherDetails);
  } catch (err) {
    next(err);
  }
};
module.exports = {patchuser, deluser, Alluser, Finduser};
