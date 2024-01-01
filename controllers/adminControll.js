const product = require("../models/productschema");
const userData = require("../models/userSchema");

const adminObject = {
  adminPage: (req, res) => {
    res.render("admin/adminpage");
  },
  addProduct: (req, res) => {
    res.render("admin/addproduct");
  },
  showProduct: (req, res) => {
    res.render("admin/showproduct");
  },
  showUser: async (req, res) => {
    try {
      const data = await userData.find({}); // Retrieve all products from the database
      res.render("admin/showusers", { data });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  postAddProduct: async (req, res) => {
    const { productName, productDescription, productPrice } = req.body;

    console.log(productName);
    const productImage = req.file
      ? `/uploads/${req.file.filename}`
      : "/uploads/defaultimage.jpg";
    const details = new product({
      productName,
      productDescription,
      productPrice,
      productImage,
    });
    await details.save();
    res.redirect("/admin/addProduct");
  },
  showProduct: async (req, res) => {
    try {
      const products = await product.find(); // Retrieve all products from the database
      res.render("admin/showproduct", { products });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const productdata = req.params.productId;

      // Use mongoose to delete the product by its ID
      await product.findOneAndDelete(productdata);

      res.redirect("/admin/showproduct");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  logout: (req, res) => {
    // Implement logout logic here
    // For example, destroy the session if you're using sessions
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect("/"); // Redirect to the login or home page after logout
    });
  },
  getEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const productToEdit = await product.findById(productId);
      res.render("admin/editproduct", { product: productToEdit });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  postEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const { productName, productDescription, productPrice } = req.body;

      // Update the product in the database
      await product.findByIdAndUpdate(productId, {
        productName,
        productDescription,
        productPrice,
        // Update other fields as needed
      });

      res.redirect("/admin/showproduct");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  deleteData: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Delete the user from the database
      await userData.findByIdAndDelete(userId);

      // Redirect back to the showUsers page or wherever you want
      res.redirect("/admin/showusers");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
module.exports = adminObject;
