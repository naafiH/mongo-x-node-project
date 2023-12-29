const mongoose = require("mongoose");
const schema = new mongoose.schema({
  productname: {
    type: String,
    required: true,
  },
  productDescription: {
     type: String, 
     required: true 
    },
  producprice: { 
    type: Number,
     required: true 
    },
  productimage: {
     type: String 
    },
});
const productDetails = new mongoose.model("productdetails", schema);
module.exports = schema;
