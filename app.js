const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache");
const path = require("path");
require('dotenv').config();
const userRouter = require("./router/userRouter");
const adminRout=require("./router/adminRouter")

// MongoDB connection
require("./config/config");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join("public")));

app.set("view engine", "ejs");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);


app.use("/", userRouter);
app.use("/admin",adminRout)

app.listen(port, () => {
  console.log("app is running in the server ");
});
