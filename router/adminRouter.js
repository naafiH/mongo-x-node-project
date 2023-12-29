const express =require("express")
const router = express.Router()
const {adminPage, addProduct, showProduct, showUser}=require("../controllers/adminControll")

router.get("/adminpage",adminPage)
router.get("/addproduct",addProduct)
router.get("/showproduct",showProduct)
router.get("/showusers",showUser)
module.exports =router