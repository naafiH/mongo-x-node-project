const express = require("express");
const userData = require("../models/userSchema");
let loginerrr = "";
let signuperr = "";
const bcrypt = require("bcryptjs");
const product =require("../models/productschema")

const object = {
  homePage: async (req, res) => {
    if (req.session.secure) {
      const products = await product.find()
      res.render("user/home",{products});
    } else {
      res.redirect("signup");
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
        req.session.secure = password;
        await userData.insertMany([user]);
        res.redirect("/");
        // }
      }
    }
  },
  postLogin: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await userData.findOne({
      email: email
    });

    
    // // console.log(isPassTrue);
    // // console.log(userExist.hashPassword);
    // console.log(password);
    // console.log(userExist._id);
    // console.log(userExist, "esshgdh");
    if (userExist ) {
      const isPassTrue = await bcrypt.compare(password,userExist.hashPassword) 
      if(isPassTrue){

        req.session.secure = userExist._id;
        if (userExist.usertype === "admin") {
          console.log(userExist.usertype);
          req.session.isadmin = true;
          res.redirect("admin/adminpage");
        } else {
          req.session.isadmin = false;
          console.log("login complete");
          res.redirect("/");
        }
      }
    } else {
      loginerrr = "you dont have an account please signup";

      res.redirect("/login");
    }
  },
  logoutGet: (req, res) => {
    req.session.destroy((destroy) => {
      const userExist =  userData.findOne()
      if (destroy) {
        console.log("there is an error in destroing");
      } else {
        res.redirect("/login");
        console.log(userExist.email);
      }
    });
  },
  // showProduct:async(req,res)=>{
  //   try{
  //     const products = await product.find()
  //     console.log(products);
  //     res.render("user/home",{products})
  //   }catch{
      
  //   }
  // }
};

module.exports = object;
