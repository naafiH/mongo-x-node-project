const express = require("express");
const router = express.Router();
const upload = require("../functions/multer");

const {
  adminPage,
  addProduct,
  showProduct,
  showUser,
  postAddProduct,
  deleteProduct,
  logout,
  getEditProduct, // Add this line for the edit route
  postEditProduct,
  deleteData, // Add this line for handling the form submission
} = require("../controllers/adminControll");

router.get("/adminpage", adminPage);
router.get("/addproduct", addProduct);
router.get("/showproduct", showProduct);
router.get("/showusers", showUser);
router.post("/postproduct", upload, postAddProduct);
router.post("/deleteproduct/:productId", deleteProduct);
router.get("/logout", logout);
router.get("/editproduct/:productId", getEditProduct); // Add this line for the edit route
router.post("/editproduct/:productId", upload, postEditProduct); // Add this line for handling the form submission
router.post("/deletedata/:userId", deleteData); 
module.exports = router;

