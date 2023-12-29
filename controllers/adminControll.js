
const product = require("../models/userSchema");

const adminObject={
    adminPage:(req,res)=>{
        res.render("admin/adminpage")
    },addProduct:(req,res)=>{
        res.render("admin/addproduct")
    },showProduct:(req,res)=>{
        res.render("admin/showproduct")
    },showUser:(req,res)=>{
        res.render("admin/showusers")
    }

}
    module.exports = adminObject