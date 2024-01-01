const express =require("express")
const router = express.Router()
const validation =require("../functions/passValidation")
const upload = require("../functions/multer")

const {homePage,signUpPage, logInPage, postSignup, postLogin, logoutGet} = require("../controllers/mainController")
router.get("/",homePage)
router.get("/signup",signUpPage)
router.get("/login",logInPage)
router.post("/signupForm",validation,postSignup)
router.post("/loginForm",postLogin)
router.get("/logout",logoutGet)
module.exports = router