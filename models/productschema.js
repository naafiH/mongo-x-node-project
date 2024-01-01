const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
});
const productDetails = new mongoose.model("productdetails", schema);
module.exports = productDetails;
