const express = require("express");
const userData = require("../models/userSchema");
let loginerrr = "";
let signuperr = "";
const bcrypt = require("bcryptjs");

const object = {
  homePage: (req, res) => {
    if (req.session.secure) {
      res.render("user/home");
    } else {
      res.redirect("signup");
    }
  },
  signUpPage: (req, res) => {
    if (req.session.secure) {
      res.redirect("/");
    } else {
      res.render("user/signup", { signupError: signuperr });
    }
  },
  logInPage: (req, res) => {
    if (req.session.secure) {
      res.redirect("/");
    } else {
      res.render("user/login", { LoginError: loginerrr });
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
      email: email,
      password: password,
    });
    console.log(userExist, "esshgdh");

    if (userExist) {
      req.session.secure = password;
      console.log("login complete");
      res.redirect("/");
    } else {
      loginerrr = "you dont have an account please signup";

      res.redirect("/login");
    }
  },
  logoutGet: (req, res) => {
    req.session.destroy((destroy) => {
      if (destroy) {
        console.log("there is an error in destroing");
      } else {
        res.redirect("/login");
      }
    });
  },
};

module.exports = object;
