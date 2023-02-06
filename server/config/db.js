const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_PORT);
  } catch (err) {
    console.log(err);
  }
};
//to find if its not disconnected we will know instantly but i have already made my mongoDB atlas as on 0.0.0.0 ip
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
//will shiw connected
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

module.exports = connect;
