const express = require("express");
const userData = require("../models/userSchema");
let loginerrr = "";
let signuperr = "";
const bcrypt = require("bcryptjs");
const product = require("../models/productschema");
const userUpdate = require("../models/userupdate");

const object = {
  homePage: async (req, res) => {
    if (req.session.secure) {
      const products = await product.find();
      res.render("user/home", { products });
    } else {
      res.redirect("/signup");
    }
  },
  signUpPage: (req, res) => {
    if (req.session.secure) {
      res.redirect("/");
    } else {
      res.render("signup", { signupError: signuperr });
    }
  },
  logInPage: (req, res) => {
    if (req.session.secure) {
      res.redirect("/");
    } else {
      res.render("login", { LoginError: loginerrr });
    }
  },
  postSignup: async (req, res) => {
    const { username, email, password, repassword } = req.body;
    console.log(repassword);
    const userExist = await userData.findOne({ email: email });

    if (userExist) {
      signuperr = "you already have an account please login";
      res.redirect("/signup");
    } else {
      console.log("ethi kayunju");
      console.log(password, repassword);
      if (password == repassword) {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        console.log(password);
        // const confirmpass = await bcrypt.compare(cpassword,hashPassword)
        // console.log(confirmpass);
        // if (confirmpass) {
        const user = {
          username,
          email,
          hashPassword,
        };
        console.log(user);
        req.session.secure = user.hashPassword;
        await userData.insertMany([user]);
        console.log(user.hashPassword);
        res.redirect("/");
        // }
      }
    }
  },
  postLogin: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await userData.findOne({
      email: email,
    });

    // // console.log(isPassTrue);
    // // console.log(userExist.hashPassword);
    // console.log(password);
    // console.log(userExist._id);
    // console.log(userExist, "esshgdh");
    if (userExist) {
      const isPassTrue = await bcrypt.compare(password, userExist.hashPassword);
      if (isPassTrue) {
        if (userExist.usertype === "admin") {
          req.session.key = userExist._id;
          console.log(userExist.usertype);
          req.session.isadmin = true;
          res.redirect("admin/adminpage");
        } else {
          req.session.secure = userExist._id;
          console.log("login complete");
          res.redirect("/");
        }
      } else {
        loginerrr = "you dont have an account please signup";

        res.redirect("/login");
      }
    } else {
      loginerrr = "you dont have an account please signup";

      res.redirect("/login");
    }
  },
  logoutGet: (req, res) => {
    req.session.destroy((destroy) => {
      const userExist = userData.findOne();
      if (destroy) {
        console.log("there is an error in destroing");
      } else {
        res.redirect("/login");
        console.log(userExist.email);
      }
    });
  },
  viewprofile: async (req, res) => {
    try {
      if (req.session.secure) {
        const data = await userData.findOne({ _id: req.session.secure }); // Retrieve all products from the database
        const userfindresult = await userData.aggregate([
          { $match: { _id: data._id } },
          {
            $lookup: {
              from: "userupadates",
              localField: "_id",
              foreignField: "userId",  // Adjust this field based on your data structure
              as: "userProfile",
            },
          },
        ]);
        console.log(data);
        console.log(userfindresult);
        res.render("user/viewprofile", { data, userfindresult });
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
  updateProfile: async (req, res) => {
    if (req.session.secure) {
      //here we are finding and fatching data using session .this for getting the userId form the database
      const data = await userData.findOne({ _id: req.session.secure });
      //Here the data is take from another collection using $looku. profile is the another collection
      //from where take data and data will store in userprofile(always check the spelling)
      const userfindresult = await userData.aggregate([
        { $match: { _id: data._id } },
        {
          $lookup: {
            from: "userupadates",
            localField: "_id",
            foreignField: "userId",  // Adjust this field based on your data structure
            as: "userProfile",
          },
        },
      ]);
      console.log(userfindresult);
      res.render("user/updateprofile", { data, userfindresult });
    } else {
      res.redirect("/");
    }
  },
  postUpdateprofile: async (req, res) => {
      const data = await userData.findOne({ _id: req.session.secure });
      const userId = data._id;
      const { username, email, dateofbirth, gender, phone } = req.body;


      await data.updateOne(
        { _id: req.session.secure },
        { $set: { username, email } }
      );

      await userUpdate.updateOne(
        { userId },
        { $set: { userId, dateofbirth, gender, phone } },
        { upsert: true }
      );
      res.redirect("/user/viewprofile");
      console.log("heyy");
  },
};

module.exports = object;
