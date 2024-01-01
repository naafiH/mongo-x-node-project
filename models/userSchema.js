const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashPassword: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    default: "user",
  },
});
const userModel = new mongoose.model("userdatas", schema);
module.exports = userModel;
