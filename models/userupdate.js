const mongoose = require("mongoose");

const newaddress = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  dateofbirth: { type: Date },
  gender: { type: String },
  phone: { type: String },
});
const userUpdate = mongoose.model("userupadate", newaddress);
module.exports = userUpdate;
